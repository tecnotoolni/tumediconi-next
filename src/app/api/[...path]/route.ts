import { NextRequest, NextResponse } from 'next/server';
import { getUserToken } from '@/lib/private/auth';
import { cookies } from 'next/headers';

interface RequestInitWithDuplex extends RequestInit {
  duplex?: 'half';
}

async function forwardRequest(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  request: NextRequest,
  path: string[]
) {
  const token = await getUserToken();
  const fullPath = path.join('/');
  const targetUrl = `${process.env.API_URL}/${fullPath}`;

  const init: RequestInitWithDuplex = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (method !== 'GET') {
    init.headers = {
      ...init.headers,
      'Content-Type': request.headers.get('content-type') || 'application/json',
    };
    init.body = method === 'PUT' ? await request.text() : request.body;
    init.duplex = 'half';
  }

  const backendRes = await fetch(targetUrl, init);
  return { backendRes, fullPath };
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { backendRes } = await forwardRequest('GET', request, (await params).path);

  const contentType = backendRes.headers.get('content-type') || 'application/octet-stream';

  if (contentType.startsWith('image') || contentType.includes('octet-stream')) {
    const buffer = await backendRes.arrayBuffer();
    return new Response(buffer, {
      status: backendRes.status,
      headers: { 'Content-Type': contentType },
    });
  }

  const text = await backendRes.text();
  return new Response(text, {
    status: backendRes.status,
    headers: { 'Content-Type': contentType },
  });
}

export async function POST(request: NextRequest, { params }:{ params: Promise<{ path: string[] }> }) {
  const { backendRes, fullPath } = await forwardRequest('POST', request, (await params).path);
  const res = await backendRes.json();

  if (fullPath === 'auth/login' && backendRes.ok && res?.data?.token) {
    const cookieStore = await cookies();
    cookieStore.set('token', res.data.token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
  }

  return NextResponse.json(res);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { backendRes } = await forwardRequest('PUT', request, (await params).path);
  const res = await backendRes.json();
  return NextResponse.json(res);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { backendRes } = await forwardRequest('DELETE', request, (await params).path);
  const res = await backendRes.json();
  return NextResponse.json(res);
}