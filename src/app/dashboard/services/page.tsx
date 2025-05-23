"use client"
import SubpageTitle from "@/components/private/SubpageTitle";
import Button from "@/components/common/ui/Button";
import { TbPlus } from "react-icons/tb";
import { Service } from "@/types/Service";
import { useCallback, useEffect, useState } from "react";
import { getServicesByDoctorID, toggleServiceByID } from "@/lib/private/serviceHandler";
import { UseAuthStore } from "@/store/useAuthStore";
import { Actions } from "@/types/UI";
import { KeyWithStringValue } from "@/types/KeyWithStringValue";
import Modal from "@/components/common/ui/Modal";
import ManageService from "@/components/private/forms/service/ManageService";
import ServiceCard from "@/components/private/cards/ServiceCard";
import toast from "react-hot-toast";

export default function DashboardServices() {

    const [services, setServices] = useState<Service[]>([]);
    const { user } = UseAuthStore()
    const [action, setAction] = useState<Actions>(Actions.create);
    const [values, setValues] = useState<KeyWithStringValue>({})
    const [isOpen, setIsOpen] = useState(false);

    const actionTitle = {
        [Actions.create]: "Agregar Servicio",
        [Actions.update]: "Modificar Servicio",
        [Actions.delete]: "Eliminar Servicio",
    }
    
    const fetchServices = useCallback(async () => {
        const response = await getServicesByDoctorID(user?.doctor?.id || 0);
        console.log(response)

        setServices(response.data);
    }, [user?.doctor?.id]);

    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

    const handleDelete = async (service: Service) => {
        console.log(service)
    }

    const handleToggle = async (service: Service) => {
        try {
            console.log(service)
            const response = await toggleServiceByID(service.id);
            console.log(response)
            toast.success("Estado del servicio cambiado correctamente")
            fetchServices();
        } catch(error) {
            console.log(error)
            toast.error("Error al cambiar el estado del servicio")
        }
    }

    const handleModify = (service: Service) => {
        setAction(Actions.update);
        setValues({
            id: String(service.id),
            doctorID: String(user?.doctor?.id),
            name: service.name,
            description: service.description || "",
            basePrice: String(service.basePrice),
        })

        setIsOpen(true);
    }


    const handleCreate = () => {
        setAction(Actions.create);
        setValues({
            doctorID: String(user?.doctor?.id),
        })

        setIsOpen(true);
    }

    return(
        <>
            <SubpageTitle title="Servicios">
                <Button color="gray" label="Agregar Servicio" onClick={handleCreate} type="button" icon={TbPlus}/>
            </SubpageTitle>

            <ul className="grid grid-cols-3 gap-4">
                {services.map((service, index) => (
                    <ServiceCard handleToggle={handleToggle} handleModify={handleModify} handleDelete={handleDelete} key={index} service={service} />
                ))}
            </ul>

            <Modal
                title={actionTitle[action]}
                open={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <ManageService reload={fetchServices} values={values} onClose={()=> {setIsOpen(false)}} />
            </Modal>
        </>
    )
}