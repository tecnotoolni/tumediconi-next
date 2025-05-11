"use client";
import SiteIdentifierTitle from "@/components/common/SiteIdentifier";
import Button from "@/components/common/ui/Button";
import TextInput from "@/components/common/ui/TextInput";
import { login } from "@/lib/auth";
import es from "@/sources/lang.es";
import toast from "react-hot-toast";
import { FiLogIn } from "react-icons/fi";

export default function AuthLogin() {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      
      try {
        const formData = new FormData(event.currentTarget);
        const identifier = formData.get('identifier') as string;
        const password = formData.get('password') as string;
  
        const { user } = await login({identifier, password});
        
        console.log("Usuario autenticado:", user);
        
      } catch (error) {
        toast.error("Error al iniciar sesión:" + error );
      }
    }

    return (
        <main className="flex justify-center items-center size-full">
        <form onSubmit={handleSubmit} method="post" className="border border-primary-200 p-8 rounded-2xl max-w-md w-full">
            <SiteIdentifierTitle name={es.routes.login.title} />
            <div className="flex flex-col gap-4 mb-4">
              <TextInput label="Nombre de Usuario o Correo" name="identifier" />
              <TextInput label="Contraseña" name="password" />
            </div>
            <div className="flex gap-2 justify-end">
              <Button color="blue" icon={FiLogIn} label="Iniciar Sesión" type="submit" />
            </div>
        </form>
      </main>
    )
}