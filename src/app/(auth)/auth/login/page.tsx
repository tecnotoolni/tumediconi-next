"use client";
import SiteIdentifierTitle from "@/components/common/SiteIdentifier";
import Button from "@/components/common/ui/Button";
import TextInput from "@/components/common/ui/TextInput";
import es from "@/sources/lang.es";
import routes from "@/sources/routes";
import { UseAuthStore } from "@/store/useAuthStore";
import { ApiResponse } from "@/types/ApiResponse";
import { UserAuthenticated } from "@/types/User";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiLogIn } from "react-icons/fi";

export default function AuthLogin() {
  const { setUser } = UseAuthStore();
  const [disabledButton, setDisabledButton] = useState(false);

  const saveUser = (user: UserAuthenticated) => {
    setUser(user);
  }
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      toast.loading("Iniciando sesión...");
      setDisabledButton(true);

      const formData = new FormData(event.currentTarget);
      const identifier = formData.get('identifier') as string;
      const password = formData.get('password') as string;

      const res = await fetch(routes.api.client.login, {
        method: 'POST',
        body: JSON.stringify({ identifier, password }),
        headers: { 'Content-Type': 'application/json' },
      });
        
      const meta = await res.json() as ApiResponse<{token: string, user: UserAuthenticated}>;
          
      if (!meta.success) {
        throw new Error(meta.error?.message);
      }

      toast.success(`Se ha iniciado sesión correctamente, bienvenido: ${meta.data.user.username}`);
      saveUser(meta.data.user);

      setTimeout(() => {
        redirect(routes.dashboard);
      }, 2000);

    } catch (error: unknown) {
      setDisabledButton(false);
      toast.error(getErrorMessage(error));
    }
  }

    return (
        <main className="flex justify-center items-center size-full">
        <form onSubmit={handleSubmit} method="post" className="border border-primary-200 p-8 rounded-2xl max-w-md w-full">
            <SiteIdentifierTitle name={es.login.title} />
            <div className="flex flex-col gap-4 mb-4">
              <TextInput label="Nombre de Usuario o Correo" name="identifier" />
              <TextInput type="password" label="Contraseña" name="password" />
            </div>
            <div className="flex gap-2 justify-end">
              <Button disabled={disabledButton} color="blue" icon={FiLogIn} label="Iniciar Sesión" type="submit" />
            </div>
        </form>
      </main>
    )
}