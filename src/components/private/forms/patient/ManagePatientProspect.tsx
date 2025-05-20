import VisualSelect from "@/components/common/ui/VisualSelect";
import GeolocationSelects from "../GeolocationSelects";
import TextAreaInput from "@/components/common/ui/TextAreaInput";
import TextInput from "@/components/common/ui/TextInput";
import { KeyWithStringValue } from "@/types/KeyWithStringValue";
import { useEffect, useState } from "react";
import { genderOptions } from "@/sources/options";
import Button from "@/components/common/ui/Button";
import { StatusForm } from "@/types/UI";
import LoadingSpinner from "@/components/common/ui/LoadingSpinner";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { createPatientProspect, updatePatientProspect } from "@/lib/patientHandler";

interface Props {
  errors?: KeyWithStringValue;
  values?: KeyWithStringValue;
  onClose: () => void;
  reload: () => void
}

export default function ManagePatientProspect({
  errors,
  values,
  onClose,
  reload,
}: Props) {
  const [fieldsError, setFieldsError] = useState<KeyWithStringValue>({});
  const [data, setData] = useState<KeyWithStringValue>({});
  const [status, setStatus] = useState<StatusForm>(StatusForm.loading);

  useEffect(() => {
    if(!values) return;
    console.log(values)
    setData(values);
  }, [values]);

  const setDynamicData = (field: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (errors) {
      setFieldsError(errors);
    }
  }, [errors]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setStatus(StatusForm.loading);
      const formData = new FormData(event.currentTarget);
      const editMode = data.id ? true : false;

      const id = formData.get("id");
      const firstName = formData.get("firstName");
      const lastName = formData.get("lastName");
      const birthDate = formData.get("birthDate");
      const address = formData.get("aproximateAddress");
      const gender = formData.get("gender");
      const identityCard = formData.get("identityCard");
      const municipaltyID = formData.get("municipaltyID");
      const phone = formData.get("phone");
      const doctorID = formData.get("doctorID");

      let res;

      if (editMode) {
        res = await updatePatientProspect({
          id,
          data: {
            firstName,
            lastName,
            birthDate,
            address,
            doctorID,
            gender,
            identityCard,
            municipaltyID,
            phone,
          },
        });
      } else {
        res = await createPatientProspect({
          data: {
            firstName,
            lastName,
            birthDate,
            address,
            doctorID,
            gender,
            identityCard,
            municipaltyID,
            phone,
          },
        });
      }

      if (!res.success) {
        setStatus(StatusForm.onhold);
        setFieldsError(res.error?.issues || {})
        console.log(res.error?.issues)
        throw new Error(res.error?.message);
      }

      toast.success(editMode ? "Prospecto de paciente actualizado correctamente" : "Prospecto de paciente creado correctamente");
      setStatus(StatusForm.success);
      onClose()
      reload()

    } catch (error) {
      toast.error(getErrorMessage(error))
      setStatus(StatusForm.onhold);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-6 p-4">
      {status == StatusForm.loading && (
        <LoadingSpinner className="absolute top-0 left-0 bg-white/85" />
      )}
      <input name="doctorID" type="hidden" value={data?.doctorID || ""} />
      <section className="flex flex-col gap-4">
        <input name="id" type="hidden" value={data?.id || ""} />
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            required
            value={data?.firstName}
            error={fieldsError?.firstName}
            label="Nombres"
            name="firstName"
          />
          <TextInput
            required
            value={data?.lastName}
            error={fieldsError?.lastName}
            label="Apellidos"
            name="lastName"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            required
            value={data?.identityCard}
            error={fieldsError?.identityCard}
            label="Cédula de Identidad"
            name="identityCard"
          />
          <TextInput
            value={data?.birthDate}
            error={fieldsError?.birthDate}
            type="date"
            label="Fecha de Nacimiento"
            name="birthDate"
          />
        </div>
        <GeolocationSelects
          data={data}
          fieldError={fieldsError}
          setDynamicData={setDynamicData}
          onLoadingChange={() => setStatus(StatusForm.onhold)}
        />
        <VisualSelect value={data?.gender} inline name="gender" options={genderOptions} />
        <TextAreaInput
          value={data?.address}
          error={fieldsError?.aproximateAddress}
          label="Dirección Aproximada"
          name="aproximateAddress"
        />
      </section>
      <div className="flex justify-end gap-2">
          <Button color="blue" label="Aceptar" type="submit" />
          <Button color="red" label="Cancelar" type="button" onClick={onClose} />
      </div>
    </form>
  );
}
