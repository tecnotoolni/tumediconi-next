import { NextRequest, NextResponse } from 'next/server';
import { getUserToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  const token = await getUserToken();
  const fullPath = params.path.join('/');
  const targetUrl = `${process.env.API_URL}/${fullPath}`;

  console.log(targetUrl)

  const backendRes = await fetch(targetUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  const token = await getUserToken();
  const fullPath = params.path.join('/');
  const targetUrl = `${process.env.API_URL}/${fullPath}`;

  const backendRes = await fetch(targetUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': request.headers.get('content-type') || 'application/json',
    },
    body: request.body,
    duplex: 'half',
  }); 
  
  const res = await backendRes.json();

  console.log(res)

  if (fullPath === 'auth/login' && backendRes.ok && res?.data?.token) {
    const cookieStore = await cookies();
  
    cookieStore.set('token', res.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
  }

  return NextResponse.json(res);
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
  const token = await getUserToken();
  const fullPath = params.path.join('/');
  const targetUrl = `${process.env.API_URL}/${fullPath}`;
  const body = await request.text();

  const backendRes = await fetch(targetUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': request.headers.get('content-type') || 'application/json',
    },
    body,
  });

  const res = await backendRes.json();

  return NextResponse.json(res);
}