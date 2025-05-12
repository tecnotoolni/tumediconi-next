"use client";
import SiteIdentifierTitle from "@/components/common/SiteIdentifier";
import AvatarUpload from "@/components/common/ui/AvatarUpload";
import Button from "@/components/common/ui/Button";
import SelectInput from "@/components/common/ui/SelectInput";
import TextInput from "@/components/common/ui/TextInput";
import VisualSelect from "@/components/common/ui/VisualSelect";
import es from "@/sources/lang.es";
import { UseAuthStore } from "@/store/useAuthStore";
import { FiLogIn } from "react-icons/fi";
import { TbGenderMale } from "react-icons/tb";

export default function AuthFinish() {
    const { user } = UseAuthStore();

    const genderOptions = [
      {
        value: "male",
        label: "Masculino",
        icon: TbGenderMale
      },
      {
        value: "female",
        label: "Femenino",
        icon: TbGenderMale
      }
    ]

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    }
    
    return (
        <main className="flex justify-center items-center size-full">
        <form onSubmit={handleSubmit}  method="post" className="border border-primary-200 p-8 rounded-2xl w-full max-w-lg">
            <SiteIdentifierTitle name={es.login.title} />
            <AvatarUpload className="mb-8" currentAvatarUrl={user?.avatar?.fileUrl} />

            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-primary-700 mb-6">Datos Personales</h2>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <TextInput label="Nombres" name="identifier" />
                  <TextInput label="Apellidos" name="password" type="password" />
                </div>
                <VisualSelect inline name="gender" options={genderOptions} />
                <div className="grid grid-cols-2 gap-4">
                  <TextInput type="date" label="Activo Desde" name="activeSince" />
                  <SelectInput label="Especialidad" options={[{value: "gato", label: "gato"}]} name="specialty" />
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button color="blue" icon={FiLogIn} label="Iniciar Sesión" type="submit" />
            </div>
        </form>
      </main>
    );
}