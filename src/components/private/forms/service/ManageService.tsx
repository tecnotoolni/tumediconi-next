import TextAreaInput from "@/components/common/ui/TextAreaInput";
import TextInput from "@/components/common/ui/TextInput";
import { KeyWithStringValue } from "@/types/KeyWithStringValue";
import { useEffect, useState } from "react";
import Button from "@/components/common/ui/Button";
import { StatusForm } from "@/types/UI";
import LoadingSpinner from "@/components/common/ui/LoadingSpinner";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import PriceInput from "@/components/common/ui/PriceInput";
import { createService, updateService } from "@/lib/serviceHandler";

interface Props {
  errors?: KeyWithStringValue;
  values?: KeyWithStringValue;
  onClose: () => void;
  reload: () => void
}

export default function ManageService({
  errors,
  values,
  onClose,
  reload,
}: Props) {
  const [fieldsError, setFieldsError] = useState<KeyWithStringValue>({});
  const [data, setData] = useState<KeyWithStringValue>({});
  const [status, setStatus] = useState<StatusForm>(StatusForm.onhold);

  useEffect(() => {
    if(!values) return;
    console.log(values)
    setData(values);
  }, [values]);


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
      const doctorID = formData.get("doctorID");
      const name = formData.get("name");
      const description = formData.get("description");
      const basePrice = formData.get("basePrice");

      let res;

      if (editMode) {
        res = await updateService({
            id,
            data: {
                name,
                description,
                basePrice
            },
        });
      } else {
        res = await createService({
            doctorID,
            data: {
                name,
                description,
                basePrice
            },
        });
      }

      if (!res.success) {
        setStatus(StatusForm.onhold);
        setFieldsError(res.error?.issues || {})
        console.log(res.error?.issues)
        throw new Error(res.error?.message);
      }

      toast.success(editMode ? "Servicio actualizado con éxito" : "Servicio creado con éxito");
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
        <TextInput
            required
            value={data?.name}
            error={fieldsError?.firstName}
            label="Nombre del Servicio"
            name="name"
        />
        <TextAreaInput label="Descripción" name="description" value={data?.description} error={fieldsError?.description} />
        <PriceInput label="Precio Base" name="basePrice" error={fieldsError?.basePrice} value={data?.basePrice} /> 
      </section>
      <div className="flex justify-end gap-2">
          <Button color="blue" label="Aceptar" type="submit" />
          <Button color="red" label="Cancelar" type="button" onClick={onClose} />
      </div>
    </form>
  );
}
