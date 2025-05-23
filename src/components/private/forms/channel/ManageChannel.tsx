import Button from "@/components/common/ui/Button";
import LoadingSpinner from "@/components/common/ui/LoadingSpinner";
import SelectInput from "@/components/common/ui/SelectInput";
import TextInput from "@/components/common/ui/TextInput";
import VisualSelect from "@/components/common/ui/VisualSelect";
import { createContactChannel, updateContactChannel } from "@/lib/private/contactChannelHandler";
import { ContactChannelType } from "@/types/ContactChannel";
import { KeyWithStringValue } from "@/types/KeyWithStringValue";
import Option from "@/types/Option";
import { StatusForm } from "@/types/UI";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { isValidEmail, isValidUrl } from "@/utils/validators";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TbGlobe, TbMail, TbPhone } from "react-icons/tb";

interface Props {
    values: KeyWithStringValue
    onClose: () => void;
    reload: () => void
}

export default function ManageCommunicationChannel({ values, onClose, reload} : Props) {
    const [errors, setErrors] = useState<KeyWithStringValue | undefined>({});
    const [data, setData] = useState<KeyWithStringValue>({});
    const [type, setType] = useState<string>();
    const [email, setEmail] = useState<string>("");
    const [link, setLink] = useState<string>("");
    const [status, setStatus] = useState<StatusForm>(StatusForm.onhold);

    useEffect(() => {
        setData(values);
        setType(values.type)
    }, [values]);


    const setDynamicError = (field: string, value: string) => {
        setErrors((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    useEffect(() => {
        setErrors({})
    }, [type]);

    useEffect(() => {
        if (email.length > 0 && !isValidEmail(email)) {
            setDynamicError("value", "El correo no es válido");
        } else {
            setDynamicError("value", "");
        }
    }, [email]);

    useEffect(() => {
        if (link.length > 0 && !isValidUrl(link)) {
            setDynamicError("value", "El vínculo no es válido");
        } else {
            setDynamicError("value", "");
        }
    }, [link]);

    const socialMedias : Option[] = [
        {
            label: "Facebook",
            value: "facebook",
        },
        {
            label: "Instagram",
            value: "instagram",
        },
        {
            label: "Telegram",
            value: "telegram",
        },
        {
            label: "X (antes Twitter)",
            value: "twitterx",
        },
        {
            label: "Otro",
            value: "other",
        }
    ]

    const contactChannelTypeOptions = [
        {
            label: "Red Social",
            value: "social_media",
            icon: TbGlobe
        },
        {
            label: "Teléfono",
            value: "phone",
            icon: TbPhone
        },
        {
            label: "Correo",
            value: "email",
            icon: TbMail
        }
    ]

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const editMode = values.id ? true : false;

            setStatus(StatusForm.loading);

            const formData = new FormData(event.currentTarget);

            const createdBy = formData.get("createdBy")
            const patientID = formData.get("patientID")
            const name = formData.get("name")
            const value = formData.get("value")
            const type = formData.get("type")
            const notes = formData.get("type")
            
            let res;

            if (editMode) {
                res = await updateContactChannel({
                    data: {
                        id: values.id,
                        name,
                        value,
                        notes,
                        type,
                    }
                })

            } else {
                res = await createContactChannel({
                    data: {
                        createdBy,
                        name,
                        value,
                        notes,
                        patientID,
                        type
                    }
                })
            }


            if(!res.success) {
                setErrors(res.error?.issues)
                setStatus(StatusForm.onhold);
                console.log(res.error)
                throw new Error(res.error?.message)
            }

            toast.success(editMode ? "El canal de comunicación ha sido editado correctamente" : "El canal de comunicación ha sido creado correctamente")
            setStatus(StatusForm.success);
            onClose()
            reload()

        } catch(error) {
            toast.error(getErrorMessage(error))
            setStatus(StatusForm.onhold);
            onClose()
        }
    }
    
    return(
        <form onSubmit={handleSubmit} className="relative flex flex-col gap-6 p-4">
            {status == "loading" && <LoadingSpinner className="absolute top-0 left-0 before:bg-white/85 before:size-full before:absolute"/>}
            <section className="flex flex-col gap-4">
                <input type="hidden" value={data.createdBy || ""} name="createdBy" />
                <input type="hidden" value={data.patientID || ""} name="patientID" />
                <VisualSelect onChange={setType} value={data.type} name="type" label="Canal de Comunicación" options={contactChannelTypeOptions} />
                { 
                    type == ContactChannelType.social_media && (
                    <>
                        <SelectInput required value={data.name} name="name" error={errors?.name} label="Red Social" options={socialMedias} />
                        <TextInput onChange={setLink} value={data.value} required error={errors?.value} label="Vínculo" name="value" />
                    </>
                    )
                }
                {
                    type == ContactChannelType.phone && (
                    <>
                        <TextInput required value={data.name} error={errors?.name} label="Nota" name="name" />
                        <TextInput required value={data.value} error={errors?.value} label="Teléfono" type="text" name="value" />
                    </>
                    )
                }
                {
                    type == ContactChannelType.email && (
                    <>
                        <TextInput required value={data.name} error={errors?.name} label="Nota" name="name" />
                        <TextInput required value={data.value} error={errors?.value} onChange={setEmail} label="Correo" type="email" name="value" />
                    </>
                    )
                }
            </section>
            <Button color="blue" label="Guardar" type="submit" className="w-full justify-center" />
        </form>
    )
}