// components/public/DoctorServicesClient.tsx
'use client';

import { useState } from "react";
import Button from "@/components/common/ui/Button";
import { TbStarFilled } from "react-icons/tb";
import CreateAppointment from "@/components/public/forms/CreateAppointment";
import { Service } from "@/types/Service";

export default function DoctorServicesClient({ doctorID, services }: { doctorID: number, services: Service[] }) {
    const [open, setOpen] = useState(false);
    const [serviceID, setServiceID] = useState<number>(0);

    const handleAddAppointment = (service: Service) => {
        setServiceID(service.id);
        setOpen(true);
    }

    return (
        <>
            <article className="flex flex-col gap-2 mt-8">
                <h2 className="text-2xl font-raleway font-medium text-primary-600">Servicios Disponibles</h2>
                <ul className="grid grid-cols-4 gap-4">
                    {services.map((service) => (
                        <li key={service.id} className="p-8 flex flex-col text-white min-h-48 rounded-2xl bg-linear-150 from-primary-700 to-primary-400">
                            <TbStarFilled />
                            <h3 className="font-raleway">{service.name}</h3>
                            <p className="text-sm">{service.description}</p>
                            <span className="my-3 text-2xl font-raleway">
                                {service.basePrice != null
                                    ? new Intl.NumberFormat('es-NI', { style: 'currency', currency: 'NIO' }).format(service.basePrice)
                                    : "Precio no disponible"}
                            </span>
                            <Button
                                label="Agendar una Cita"
                                color="blue"
                                type="button"
                                className="w-full mt-auto justify-center"
                                onClick={() => { handleAddAppointment(service) }}
                            />
                        </li>
                    ))}
                </ul>
            </article>
            <CreateAppointment serviceID={serviceID} doctorID={doctorID} open={open} onClose={() => setOpen(false)} />
        </>
    );
}
