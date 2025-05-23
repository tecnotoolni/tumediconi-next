import Button from "@/components/common/ui/Button";
import LoadingSpinner from "@/components/common/ui/LoadingSpinner";
import TextAreaInput from "@/components/common/ui/TextAreaInput";
import TextInput from "@/components/common/ui/TextInput";
import VisualSelect from "@/components/common/ui/VisualSelect";
import AppointmentHandler from "@/lib/private/appointmentHandler";
import { KeyWithStringValue } from "@/types/KeyWithStringValue";
import { StatusForm } from "@/types/UI";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TbCalendarCheck, TbCancel, TbCheck } from "react-icons/tb";

interface Props {
    values: KeyWithStringValue
    onClose: () => void;
    reload: () => void
}

export default function ManageAppointment({ values, onClose, reload } : Props) {
    const [errors, setErrors] = useState<KeyWithStringValue | undefined>({});
    const [data, setData] = useState<KeyWithStringValue>({});
    const [status, setStatus] = useState<StatusForm>(StatusForm.onhold);

    useEffect(() => {
        setData(values);
    }, [values]);

    const appointmentStatus = [
        {
            label: "Programado",
            value: "scheduled",
            icon: TbCalendarCheck
        },
        {
            label: "Completado",
            value: "completed",
            icon: TbCheck
        },
        {
            label: "Cancelado",
            value: "canceled",
            icon: TbCancel
        },
    ]

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();

            setStatus(StatusForm.loading);

            const formData = new FormData(event.currentTarget);

            const id = formData.get("id")

            const data = {
                reason: formData.get("reason"),
                notes: formData.get("notes"),
                status: formData.get("status"),
                appointmentDate: formData.get("appointmentDate"),
                modality: formData.get("modality"),
            }

            const res =  await AppointmentHandler.update({id, data})

            if(!res.success) {
                setErrors(res.error?.issues)
                setStatus(StatusForm.onhold);
                throw new Error(res.error?.message)
            }

            toast.success("Se ha modificado la cita correctamente")
            setStatus(StatusForm.success);
            setData({});
            onClose()
            reload()
        } catch(error) {
            toast.error(getErrorMessage(error))
            setStatus(StatusForm.onhold);
        }

    }
    
    return(
        <form onSubmit={handleSubmit} className="relative flex flex-col gap-6 p-4">
            {status == "loading" && <LoadingSpinner className="absolute top-0 left-0 before:bg-white/85 before:size-full before:absolute"/>}
            <section className="flex flex-col gap-4">
                <input type="hidden" value={data?.id} name="id" />
                <input type="hidden" value={data?.appointmentDate} name="appointmentDate" />
                <input type="hidden" value={data?.modality} name="modality" />
                <TextInput readOnly value={data?.reason} required error={errors?.name} label="Motivo de la Cita" name="reason" />
                <TextAreaInput readOnly value={data.notes} name="notes" label="Notas adicionales" />
                <VisualSelect value={data?.status} name="status" options={appointmentStatus} /> 
            </section>
            <div className="flex justify-end gap-2">
                <Button color="blue" label="Aceptar" type="submit" />
                <Button color="red" label="Cancelar" type="button" onClick={onClose} />
            </div>
        </form>
    )
}