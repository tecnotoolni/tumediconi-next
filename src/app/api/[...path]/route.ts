/*
  Esta es una funcion para controlar de forma dinamica las peticiones a la API.
  Se utiliza de forma genérica como proxy, es decir, que las acciones que se realicen en esta función,
  serán replicadas en la API del backend.
  
  También con segunda intención, se maneja el token de autenticación del usuario.
*/

import { NextRequest, NextResponse } from 'next/server';
import { getUserToken } from '@/lib/auth';

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  const token = await getUserToken();
  const fullPath = params.path.join('/');
  const targetUrl = `${process.env.API_URL}/${fullPath}`;

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
  const fullPath = params.path.join('/');
  const targetUrl = `${process.env.API_URL}/${fullPath}`;
  const body = await request.text();

  const backendRes = await fetch(targetUrl, {
    method: 'POST',
    headers: {
      'Content-Type': request.headers.get('content-type') || 'application/json',
    },
    body,
  });

  const res = await backendRes.json();

  return NextResponse.json(res);
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
  const fullPath = params.path.join('/');
  const targetUrl = `${process.env.API_URL}/${fullPath}`;
  const body = await request.text();

  const backendRes = await fetch(targetUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': request.headers.get('content-type') || 'application/json',
    },
    body,
  });

  const res = await backendRes.json();

  return NextResponse.json(res);
}