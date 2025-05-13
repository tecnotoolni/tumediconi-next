"use client";
import SiteIdentifierTitle from "@/components/common/SiteIdentifier";
import AvatarUpload from "@/components/common/ui/AvatarUpload";
import Button from "@/components/common/ui/Button";
import LoadingSpinner from "@/components/common/ui/LoadingSpinner";
import CreateDoctor from "@/components/forms/CreateDoctor";
import { createDoctor } from "@/lib/doctorHandler";
import es from "@/sources/lang.es";
import routes from "@/sources/routes";
import { UseAuthStore } from "@/store/useAuthStore";
import { KeyWithStringValue } from "@/types/KeyWithStringValue";
import { UserRole } from "@/types/User";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AuthFinish() {
    const [status, setStatus] = useState<"loading" | "onhold" | "success">("loading");
    const { user } = UseAuthStore();
    const [errors, setErrors] = useState<KeyWithStringValue | undefined>({});

    const setLoading = (isLoading: boolean) => {
      setStatus(isLoading ? "loading" : "onhold");
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
          break;
        default:
          break;
      }
      
    }

    const submitAsDoctor = async (formData: FormData) => {
      try {
        setErrors({});
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
          throw new Error(doctor.error?.message);
        }

        toast.success(es.doctor.success.message);

      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    }
    
    return (
        <main className="relative flex justify-center items-center size-full py-8">
          {status === "loading" && <LoadingSpinner className="absolute" />}
          <form onSubmit={handleSubmit}  method="post" className={`border border-primary-200 p-8 rounded-2xl w-full max-h-[85vh] overflow-y-scroll max-w-lg ${status === "loading" ? "opacity-20 pointer-events-none" : ""}`}>
              <SiteIdentifierTitle name={es.finish_register.title} />
              <AvatarUpload error={errors?.avatarID} className="mb-8" currentAvatarUrl={user?.avatar?.fileUrl} />
              {user?.role == UserRole.doctor && <CreateDoctor fieldError={errors} onLoadingChange={setLoading} />}
              <Button color="blue" label="Finalizar Registro" type="submit" className="w-full justify-center" />
          </form>
      </main>
    );
}