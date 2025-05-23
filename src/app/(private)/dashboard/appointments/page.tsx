"use client";

import Modal from "@/components/common/ui/Modal";
import DoctorSideAppointmentCard from "@/components/private/cards/DoctorSideAppointmentCard";
import DoctorSideAppointmentListCard from "@/components/private/cards/DoctorSideAppointmentListCard";
import DeleteAppointment from "@/components/private/forms/appointment/DeleteAppointment";
import ManageAppointment from "@/components/private/forms/appointment/ManageAppointment";
import SubpageTitle from "@/components/private/SubpageTitle";
import AppointmentHandler from "@/lib/private/appointmentHandler";
import { Appointment } from "@/types/Appointment";
import { KeyWithStringValue } from "@/types/KeyWithStringValue";
import { Actions } from "@/types/UI";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";

export default function DashboardAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [view, setView] = useState<"calendar" | "list">("list");
    const [date, setDate] = useState<Date>(new Date());
    const [action, setAction] = useState<Actions>(Actions.update);
    const [isOpen, setIsOpen] = useState(false);
    const [values, setValues] = useState<KeyWithStringValue>({})

    const ActionTitle = {
        [Actions.create]: "Agregar Cita",
        [Actions.update]: "Modificar Cita",
        [Actions.delete]: "Eliminar Cita",
    }

    const fetchAppointments = async () => {
        const res = await AppointmentHandler.getAllByDoctor();
        setAppointments(res.data);
    }

    const handleDeleteAppointment = (appointment: Appointment) => {
        setAction(Actions.delete);
        
        setValues({
            id: String(appointment.id),
        })

        setIsOpen(true);
    }

    const handleModifyAppointment = (appointment: Appointment) => {
        setAction(Actions.update);
        setValues({
            id: String(appointment.id),
            reason: appointment.reason || "",
            notes: appointment.notes || "",
            appointmentDate: appointment.appointmentDate.toString() || "",
            modality: appointment.modality,
            status: appointment.status || "",
        })

        setIsOpen(true);
    }

    useEffect(() => {
        fetchAppointments();
    },[])

    return(
        <>
            <SubpageTitle title="Citas Programadas" />

            <article className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <button onClick={() => { setView("calendar") }} className={`px-4 py-2 bg-cool-gray-50 rounded-full ${view === "calendar" ? "bg-primary-100" : ""}`}>
                        Vista por Calendario
                    </button>
                    <button onClick={() => { setView("list") }} className={`px-4 py-2 bg-cool-gray-50 rounded-full ${view === "list" ? "bg-primary-100" : ""}`}>
                        Vista por Lista
                    </button>
                </div>

                {
                    view === "list" ? (
                        <>
                        <div className="py-2 rounded-full flex gap-4 text-center items-center text-cool-gray-300 bg-cool-gray-50">
                            <span className="w-16"></span>
                            <span className="flex-1">Paciente</span>
                            <span className="flex-1">Servicio</span>
                            <span className="flex-1">Fecha y Hora</span>
                            <span className="flex-1">Modalidad</span>
                            <span className="flex-1">Estado</span>
                            <span className="flex-1">Razón</span>
                            <span className="w-12"></span>
                        </div>
                        <ul className="flex flex-col gap-2">
                            {appointments.map((appointment, index) => (
                                <DoctorSideAppointmentListCard key={index} handleDeleteAppointment={handleDeleteAppointment} handleModifyAppointment={handleModifyAppointment} appointment={appointment} />
                            ))}
                        </ul>
                        </>
                    ) : (
                        <>
                        <div className="flex gap-4 items-start">
                            <Calendar
                                onClickDay={setDate}
                                className="rounded-xl !border-cool-gray-50 w-full"
                                formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'narrow' })}
                            />

                            <ul className="grid grid-cols-2 flex-1">
                                {appointments.filter(appointment => new Date(appointment.appointmentDate).toDateString() === date?.toDateString()).map((appointment, index) => (
                                    <DoctorSideAppointmentCard key={index} handleDeleteAppointment={handleDeleteAppointment} handleModifyAppointment={handleModifyAppointment} appointment={appointment} />
                                ))}
                            </ul>
                        </div>
                        </>
                    )
                }
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
    )
}