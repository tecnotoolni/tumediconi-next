"use client";
import SiteIdentifierTitle from "@/components/common/SiteIdentifier";
import AvatarUpload from "@/components/common/ui/AvatarUpload";
import Button from "@/components/common/ui/Button";
import TextInput from "@/components/common/ui/TextInput";
import es from "@/sources/lang.es";
import { UseAuthStore } from "@/store/useAuthStore";
import { FiLogIn } from "react-icons/fi";

export default function AuthFinish() {
    const { user } = UseAuthStore();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    }
    
    return (
        <main className="flex justify-center items-center size-full">
        <form onSubmit={handleSubmit}  method="post" className="border border-primary-200 p-8 rounded-2xl max-w-md w-full">
            <SiteIdentifierTitle name={es.login.title} />
            <AvatarUpload currentAvatarUrl={user?.avatar?.fileUrl} /> 
            <div className="flex flex-col gap-4 mb-4">
              <TextInput label="Nombre de Usuario o Correo" name="identifier" />
              <TextInput type="password" label="Contraseña" name="password" />
            </div>
            <div className="flex gap-2 justify-end">
              <Button color="blue" icon={FiLogIn} label="Iniciar Sesión" type="submit" />
            </div>
        </form>
      </main>
    );
}