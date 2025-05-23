"use client";
import SiteIdentifierTitle from "@/components/common/SiteIdentifier";
import AvatarUpload from "@/components/common/ui/AvatarUpload";
import Button from "@/components/common/ui/Button";
import LoadingOverlay from "@/components/common/ui/LoadingOverlay";
import CreateDoctor from "@/components/private/forms/doctor/CreateDoctorProfile";
import CreatePatientProfile from "@/components/private/forms/patient/CreatePatientProfile";
import { createDoctor } from "@/lib/private/doctorHandler";
import { createPatientProfile } from "@/lib/private/patientHandler";
import es from "@/sources/lang.es";
import routes from "@/sources/routes";
import { UseAuthStore } from "@/store/useAuthStore";
import FileData from "@/types/FileData";
import { KeyWithStringValue } from "@/types/KeyWithStringValue";
import { StatusForm } from "@/types/UI";
import { UserRole } from "@/types/User";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AuthFinish() {
    const [status, setStatus] = useState<StatusForm>(StatusForm.loading);
    const [errors, setErrors] = useState<KeyWithStringValue | undefined>({});
    const [avatarData, setAvatarData] = useState<FileData | null>(null);
    const { setUserAvatar, setUserDoctor, setUserPatient, user} = UseAuthStore();

    useEffect(() => {
      if(user && user?.doctor || user?.patient) {
        redirect(routes.dashboard);
      }
    },[user])

    const setLoading = (isLoading: boolean) => {
      setStatus(isLoading ? StatusForm.loading : StatusForm.onhold);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      setStatus(StatusForm.loading);

      switch (user?.role) {
        case UserRole.doctor:
          await submitAsDoctor(formData);
          break;
        case UserRole.patient:
          await submitAsPatient(formData);
          break;
        case UserRole.admin:
          redirect(routes.dashboard)
        default:
          break;
      }
      
    }

    const submitAsPatient = async (formData: FormData) => {
      try {
        setErrors({});

        const avatarID = formData.get("avatarID");
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const identityCard = formData.get("identityCard");
        const phone = formData.get("phone");
        const gender = formData.get("gender")
        const birthDate = formData.get("birthDate");
        const municipaltyID = formData.get("municipaltyID");
        const address = formData.get("address");

        const data = {
          avatarID,
          firstName,
          lastName,
          identityCard,
          phone,
          gender,
          birthDate,
          municipaltyID,
          address,
        }

        const response = await createPatientProfile({ data })

        if (!response.success) {
          setErrors(response.error?.issues);
          throw new Error(response.error?.message || response?.message);
        }

        toast.success(es.patient.success.message);
        setStatus(StatusForm.success);
        setUserPatient(response.data);
        if (avatarData) {
          setUserAvatar(avatarData);
        }
        setStatus(StatusForm.onhold);

      } catch (error) {
        toast.error(getErrorMessage(error));
        setStatus(StatusForm.onhold);
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
        const notes = formData.get("notes");
  
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
          aproximateAddress,
          notes
        }

        const doctor = await createDoctor({ data })
        
        if (!doctor.success) {
          setErrors(doctor.error?.issues);
          throw new Error(doctor.error?.message || doctor?.message);
        }

        toast.success(es.doctor.success.message);
        setStatus(StatusForm.success);

        if (avatarData) {
          setUserAvatar(avatarData);
        }
        setUserDoctor(doctor.data);
        toast.success("Información guardada correctamente");
        setStatus(StatusForm.onhold);
      } catch (error) {
        toast.error(getErrorMessage(error));
        setStatus(StatusForm.onhold);
      }
    }
    
    return (
        <main className="relative flex justify-center items-center size-full py-8">
          <LoadingOverlay status={status} />
          <form onSubmit={handleSubmit}  method="post" className={`border border-primary-200 p-8 rounded-2xl w-full max-h-[85vh] overflow-y-scroll max-w-lg`}>
              <SiteIdentifierTitle name={es.finish_register.title} />
              <AvatarUpload error={errors?.avatarID} className="mb-8" setAvatarData={setAvatarData} currentAvatarId={user?.avatar?.id} currentAvatarUrl={user?.avatar?.fileUrl ? (routes.api.base + user?.avatar?.fileUrl) : null} />
                {user?.role === UserRole.doctor ? (
                <CreateDoctor fieldError={errors} onLoadingChange={setLoading} />
                ) : user?.role === UserRole.patient ? (
                <CreatePatientProfile fieldError={errors} onLoadingChange={setLoading} />
                ) : <></>}
              <Button color="blue" label="Finalizar Registro" type="submit" className="w-full justify-center" />
          </form>
          {
            status == StatusForm.success && <SuccessMessage />
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
