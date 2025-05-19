import Button from "@/components/common/ui/Button";
import LoadingSpinner from "@/components/common/ui/LoadingSpinner";
import { deleteContactChannel } from "@/lib/contactChannelHandler";
import { KeyWithStringValue } from "@/types/KeyWithStringValue";
import { Status } from "@/types/UI";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
    values: KeyWithStringValue
    onClose: () => void;
    reload: () => void
}

export default function DeleteCommunicationChannel({ values, onClose, reload} : Props) {
    const [data, setData] = useState<KeyWithStringValue>({});
    const [status, setStatus] = useState<Status>(Status.onhold);

    useEffect(() => {
        setData(values);
    }, [values]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            console.log(data)

            setStatus(Status.loading);

            const formData = new FormData(event.currentTarget);
            const id = formData.get("id")
            
            const res = await deleteContactChannel(id)


            if(!res.success) {
                setStatus(Status.onhold);
                throw new Error(res.error?.message)
            }

            console.log(res)

            toast.success("Canal de comunicación eliminado correctamente")
            setStatus(Status.success);
            onClose()
            reload()

        } catch(error) {
            toast.error(getErrorMessage(error))
            setStatus(Status.onhold);
            onClose()
        }

    }
    
    return(
        <form onSubmit={handleSubmit} className="relative flex flex-col gap-6 p-4">
            {status == "loading" && <LoadingSpinner className="absolute top-0 left-0 before:bg-white/85 before:size-full before:absolute"/>}
            <input type="hidden" name="id" value={data.id} />
            <section className="flex flex-col gap-4">
                <p>¿Deseas eliminar este canal de comunicación?</p>
            </section>
            <div className="flex justify-end gap-2">
                <Button color="blue" label="Aceptar" type="submit" />
                <Button color="red" label="Cancelar" type="button" onClick={onClose} />
            </div>
        </form>
    )
}