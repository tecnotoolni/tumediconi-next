"use client";
import SiteIdentifierTitle from "@/components/common/SiteIdentifier";
import Avatar from "@/components/common/ui/Avatar";
import AvatarUpload from "@/components/common/ui/AvatarUpload";
import Button from "@/components/common/ui/Button";
import LoadingSpinner from "@/components/common/ui/LoadingSpinner";
import CreateDoctor from "@/components/private/forms/doctor/CreateDoctorProfile";
import { createDoctor } from "@/lib/doctorHandler";
import es from "@/sources/lang.es";
import routes from "@/sources/routes";
import { UseAuthStore } from "@/store/useAuthStore";
import FileData from "@/types/FileData";
import { KeyWithStringValue } from "@/types/KeyWithStringValue";
import { UserRole } from "@/types/User";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AuthFinish() {
    const [status, setStatus] = useState<"loading" | "onhold" | "success">("onhold");
    const [errors, setErrors] = useState<KeyWithStringValue | undefined>({});
    const [avatarData, setAvatarData] = useState<FileData | null>(null);
    const { setUserAvatar, setUserDoctor, user} = UseAuthStore();

    useEffect(() => {
      if(user && user?.doctor || user?.patient) {
        redirect(routes.dashboard);
      }
    },[user])

    const setLoading = (isLoading: boolean) => {
      setStatus(isLoading ? "loading" : "onhold");
    }

    const sucessToast = () => {
      toast.custom(
        <div className="flex flex-row gap-2 p-2 bg-white rounded-lg border border-primary-400">
            <Avatar url={routes.api + (avatarData?.fileUrl ?? "")} className="size-8" />
            <div>
              <span>Has llenado tus datos correctamente</span>
              <div className="mt-1">
                <span className="text-primary-700 font-semibold">{`${user?.doctor?.firstName} ${user?.doctor?.lastName}`}</span>
              </div>
            </div>
        </div>
      ,{
        duration: 5000,
      })
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      switch (user?.role) {
        case UserRole.doctor:
          await submitAsDoctor(formData);
          break;
        case UserRole.patient:
          break;
        case UserRole.admin:
          redirect(routes.dashboard)
        default:
          break;
      }
      
    }

    const submitAsDoctor = async (formData: FormData) => {
      try {
        setErrors({});
        toast.loading("Se está guardando tu información...");
        const avatarID = formData.get("avatarID");
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const gender = formData.get("gender")
        const activeSince = formData.get("activeSince");
        const specialtyID = formData.get("specialtyID");
        const municipaltyID = formData.get("municipaltyID");
        const languages = formData.getAll("languages");
        const businessHours = formData.getAll("business_hours");
        const aproximateAddress = formData.get("aproximateAddress");
  
        const data = {
          avatarID,
          firstName,
          lastName,
          gender,
          activeSince,
          specialtyID,
          municipaltyID,
          languages,
          businessHours,
          aproximateAddress
        }

        const doctor = await createDoctor({ data })
        
        if (!doctor.success) {
          setErrors(doctor.error?.issues);
          throw new Error(doctor.error?.message || doctor?.message);
        }

        toast.success(es.doctor.success.message);
        setStatus("success");

        if (avatarData) {
          setUserAvatar(avatarData);
        }
        setUserDoctor(doctor.data);
        sucessToast()

      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    }
    
    return (
        <main className="relative flex justify-center items-center size-full py-8">
          {status === "loading" && <LoadingSpinner className="absolute" />}
          <form onSubmit={handleSubmit}  method="post" className={`border border-primary-200 p-8 rounded-2xl w-full max-h-[85vh] overflow-y-scroll max-w-lg ${status == "success" ? "hidden" : ""} ${status === "loading" ? "opacity-20 pointer-events-none blur-xs" : ""}`}>
              <SiteIdentifierTitle name={es.finish_register.title} />
              <AvatarUpload error={errors?.avatarID} className="mb-8" setAvatarData={setAvatarData} currentAvatarId={user?.avatar?.id} currentAvatarUrl={user?.avatar?.fileUrl ? (routes.api.base + user?.avatar?.fileUrl) : null} />
              {user?.role == UserRole.doctor && <CreateDoctor fieldError={errors} onLoadingChange={setLoading} />}
              <Button color="blue" label="Finalizar Registro" type="submit" className="w-full justify-center" />
          </form>
          {
            status == "success" && <SuccessMessage />
          }
      </main>
    );
}

const SuccessMessage = () => {
  return (
    <div className="border border-primary-200 p-8 flex flex-col gap-4 max-w-[400px] w-full">
      <p>{es.finish_register.success.message}</p>
      <Button
        className="justify-center"
        color="blue"
        label="Acceder Ahora"
        type="button"
        onClick={() => redirect(routes.dashboard)}
      />
    </div>
  );
};
