"use server"

/* 
  Manejo de la autenticación de usuarios en la aplicación.
  Esta función se encarga de autenticar a los usuarios mediante un token JWT.
  Se utiliza la función login para enviar una solicitud de inicio de sesión al servidor y obtener un token JWT.

  El token se almacena en una cookie HTTP segura y se puede recuperar mediante la función getUserToken.
  Las cookies se configuran para ser httpOnly y seguras en producción, lo que significa que no son accesibles desde JavaScript del lado del cliente.
*/

import { cookies } from 'next/headers';

export async function getUserToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  return token || null;
}

export async function setUserToken(token: string): Promise<void> {
  const cookieStore = await cookies();
  
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24,
  });
}

export async function login({ identifier, password }: { identifier: string; password: string }) {

  const response = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error.message || "Authentication failed");
  }

  setUserToken(result.data.token);

  return {
    user: result.data.user,
  };
}