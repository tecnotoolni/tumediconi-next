"use client";
import Modal from "@/components/common/ui/Modal";
import PatientSideAppointmentCard from "@/components/private/cards/PatientSideAppointmentCard";
import DeleteAppointment from "@/components/private/forms/my-appointment/DeleteMyAppointment";
import ManageAppointment from "@/components/private/forms/my-appointment/ManageMyAppointment";
import SubpageTitle from "@/components/private/SubpageTitle";
import AppointmentHandler from "@/lib/private/appointmentHandler";
import { Appointment } from "@/types/Appointment";
import { KeyWithStringValue } from "@/types/KeyWithStringValue";
import { Actions } from "@/types/UI";
import { useEffect, useState } from "react";

export default function MyAppointments() {

    const [appointments, setAppointments] = useState<Appointment[]>();
    const [action, setAction] = useState<Actions>(Actions.update);
    const [isOpen, setIsOpen] = useState(false);
    const [values, setValues] = useState<KeyWithStringValue>({})

    const ActionTitle = {
        [Actions.create]: "Agregar Cita",
        [Actions.update]: "Modificar Cita",
        [Actions.delete]: "Eliminar Cita",
    }
    
    const fetchAppointments = async () => {
        const res = await AppointmentHandler.getAllByPatient();
        if(!res.success) return;
        setAppointments(res.data);
        console.log(res.data);
    };

    const handleModifyAppointment = (appointment: Appointment) => {
        setAction(Actions.update);
        setValues({
            id: String(appointment.id),
            reason: appointment.reason || "",
            notes: appointment.notes || "",      
        })
        setIsOpen(true);
    }


    const handleDeleteAppointment = (appointment: Appointment) => {
        setAction(Actions.delete);
        setValues({
            id: String(appointment.id),
        })
        setIsOpen(true);
    }

    useEffect(() => {
        fetchAppointments();
    }, [])

    return (
      <>
        <SubpageTitle title="Mis Citas"></SubpageTitle>

        <article className="flex flex-col gap-4">
          <div className="py-2 rounded-full flex gap-4 text-center items-center text-cool-gray-300 bg-cool-gray-50">
            <span className="w-16"></span>
            <span className="flex-1">Doctor</span>
            <span className="flex-1">Servicio</span>
            <span className="flex-1">Fecha y Hora</span>
            <span className="flex-1">Modalidad</span>
            <span className="flex-1">Estado</span>
            <span className="flex-1">Razón</span>
            <span className="w-12"></span>
          </div>
          <ul className="flex flex-col gap-4">
            {appointments?.map((appointment, index) => (
              <PatientSideAppointmentCard
                key={index}
                appointment={appointment}
                handleModifyAppointment={handleModifyAppointment}
                handleDeleteAppointment={handleDeleteAppointment}
              />
            ))}
          </ul>
        </article>

        <Modal
          title={ActionTitle[action]}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          {action != Actions.delete ? (
            <ManageAppointment
              values={values}
              reload={fetchAppointments}
              onClose={() => {
                setIsOpen(false);
              }}
            />
          ) : (
            <DeleteAppointment
              values={values}
              reload={fetchAppointments}
              onClose={() => {
                setIsOpen(false);
              }}
            />
          )}
        </Modal>
      </>
    );
}