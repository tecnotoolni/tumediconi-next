import Button from "@/components/common/ui/Button";
import LoadingSpinner from "@/components/common/ui/LoadingSpinner";
import MultipleFileUpload from "@/components/common/ui/MultipleFileUpload";
import RichTextEditor from "@/components/common/ui/RichTextEditor";
import SelectInput from "@/components/common/ui/SelectInput";
import TextInput from "@/components/common/ui/TextInput";
import { createPatientInteraction, updatePatientInteraction } from "@/lib/interactionHandler";
import FileData from "@/types/FileData";
import { KeyWithStringValue } from "@/types/KeyWithStringValue";
import Option from "@/types/Option";
import { StatusForm } from "@/types/UI";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
    values: KeyWithStringValue
    attachments: FileData[] | undefined
    onClose: () => void;
    reload: () => void
}

export default function ManageInteraction({ values, onClose, reload, attachments } : Props) {
    const [errors, setErrors] = useState<KeyWithStringValue | undefined>({});
    const [data, setData] = useState<KeyWithStringValue>({});
    const [status, setStatus] = useState<StatusForm>(StatusForm.onhold);
    const [notes, setNotes] = useState<string | undefined>();

    useEffect(() => {
        setData(values);
        setNotes(values?.notes);
    }, [values]);

    const interactionTypes : Option[] = [
        {
            label: "Llamada",
            value: "call",
        },
        {
            label: "Correo",
            value: "email",
        },
        {
            label: "Reunión",
            value: "meeting",
        },
        {
            label: "Seguimiento",
            value: "follow_up",
        },
        {
            label: "Prescripción",
            value: "prescription",
        },
        {
            label: "Resultado de laboratorio",
            value: "lab_result",
        }
    ]

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const editMode = values.id ? true : false;

            setStatus(StatusForm.loading);

            const formData = new FormData(event.currentTarget);

            const patientID = formData.get("patientID")
            const id = formData.get("id")
            const doctorID = formData.get("doctorID")
            const name = formData.get("name")
            const notes = formData.get("notes")
            const interaction_date = formData.get("interaction_date")
            const interaction_type = formData.get("interaction_type")
            const attachments = formData.getAll("attachments")
            
            let res;

            if(editMode){
                res = await updatePatientInteraction({
                    id,
                    data: {
                        name,
                        notes,
                        interaction_date,
                        interaction_type,
                        attachments
                    }})
            } else {
                res = await createPatientInteraction({
                    doctorID,
                    patientID,
                    data: {
                        name,
                        notes,
                        interaction_date,
                        interaction_type,
                        attachments
                    }
                })
            }

            if(!res.success) {
                setErrors(res.error?.issues)
                setStatus(StatusForm.onhold);
                throw new Error(res.error?.message)
            }

            toast.success(editMode ? "Interacción actualizada correctamente" : "Interacción creada correctamente")
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
                <input type="hidden" value={data?.doctorID} name="doctorID" />
                <input type="hidden" value={data?.patientID} name="patientID" />
                <input type="hidden" value={notes} name="notes" />
                <TextInput value={data?.name} required error={errors?.name} label="Nombre de la Interacción" name="name" />
                <div className="grid grid-cols-2 gap-4">
                    <TextInput type="date" value={data?.interaction_date} error={errors?.interaction_date} label="Fecha de Interacción" name="interaction_date" />
                    <SelectInput label="Tipo de Interacción" value={data?.interaction_type} options={interactionTypes} name="interaction_type" />
                </div>
                <RichTextEditor value={data?.notes} label="Notas" onChange={setNotes} />
                <MultipleFileUpload name="attachments" attachments={attachments} />
            </section>
            <div className="flex justify-end gap-2">
                <Button color="blue" label="Aceptar" type="submit" />
                <Button color="red" label="Cancelar" type="button" onClick={onClose} />
            </div>
        </form>
    )
}