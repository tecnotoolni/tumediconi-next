"use client"

import Button from "@/components/common/ui/Button";
import LoadingOverlay from "@/components/common/ui/LoadingOverlay";
import Modal from "@/components/common/ui/Modal"
import TextAreaInput from "@/components/common/ui/TextAreaInput";
import TextInput from "@/components/common/ui/TextInput";
import VisualSelect from "@/components/common/ui/VisualSelect";
import AppointmentHandler from "@/lib/private/appointmentHandler";
import AppointmentPublicHandler from "@/lib/public/appointmentHandler";
import { UseAuthStore } from "@/store/useAuthStore";
import { StatusForm } from "@/types/UI";
import { convertToReadableDate, formatDateToISOWithTime } from "@/utils/convertToReadableDate";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useEffect, useState } from "react";
import Calendar from 'react-calendar';
import toast from "react-hot-toast";
import { TbDeviceDesktop, TbMapPin } from "react-icons/tb";

interface Props {
    serviceID: number;
    doctorID: number;
    open: boolean;
    onClose: () => void;
}

export default function CreateAppointment({serviceID, doctorID, open, onClose}: Props) {
    const [status, setStatus] = useState<StatusForm>(StatusForm.onhold);
    const [date, setDate] = useState<Date>();
    const [hasSelectedDate, setHasSelectedDate] = useState(false);
    const [hour, setHour] = useState<string>();
    const { user } = UseAuthStore();
    const [finalDateAndHour, setFinalDateAndHour] = useState<Date>();
    const [currentServiceID, setCurrentServiceID] = useState<number>(0);


    useEffect(() => {
        setCurrentServiceID(serviceID);
        setStatus(StatusForm.onhold);
        setDate(undefined);
        setHour(undefined);
        setHasSelectedDate(false);
        setFinalDateAndHour(undefined);
    },[serviceID])


    const handleVerifyAvailability = async () => {
        setStatus(StatusForm.loading);

        try {

            if(!date || !hour) {
                toast.error("Por favor selecciona una fecha y hora");
                setStatus(StatusForm.onhold);
                return;
            }

            const [hours, minutes] = hour!.split(":").map(Number);
            const finalDateAndHour = new Date(date!);
            finalDateAndHour.setHours(hours, minutes, 0, 0);

            const availability = await AppointmentPublicHandler.verifyAvailability(doctorID, finalDateAndHour);

            if(!availability.success){
                toast.error(availability.message);
                setStatus(StatusForm.onhold);
                return;
            }

            if(availability.data.length > 0) {
                toast.error("El doctor ya tiene una cita agendada para esa fecha y hora");
                setStatus(StatusForm.onhold);
                return;
            }

            setStatus(StatusForm.onhold);
            setHasSelectedDate(true);
            setFinalDateAndHour(finalDateAndHour);
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    }

    const modalityOptions = [
        {
            label: "Presencial",
            value: "face_to_face",
            icon: TbMapPin
        },
        {
            label: "Virtual",
            value: "virtual",
            icon: TbDeviceDesktop
        }
    ]

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setStatus(StatusForm.loading);

        try {
            const formData = new FormData(event.currentTarget);

            const doctorID = formData.get("doctorID");

            const data = {
                reason: formData.get("reason"),
                notes: formData.get("notes"),
                modality: formData.get("modality"),
                appointmentDate: formData.get("appointmentDate"),
                serviceID: formData.get("serviceID"),
            }

            const res = await AppointmentHandler.create({doctorID, data})

            if(!res.success) {
                setStatus(StatusForm.onhold);
                throw new Error(res.error?.message)
            }

            toast.success("Cita agendada con éxito, puedes ver los detalles en tu dashboard.");
            setStatus(StatusForm.onhold);
            onClose();
        } catch (error) {
            toast.error(getErrorMessage(error));
            setStatus(StatusForm.onhold);
        }
    }


    return(
        <Modal
            title="Agendar cita"
            onClose={onClose}
            open={open}
        >
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 p-4 relative">
                    <input type="hidden" name="serviceID" value={currentServiceID} />
                    <input type="hidden" name="doctorID" value={doctorID} />
                    <input type="hidden" name="appointmentDate" value={finalDateAndHour && formatDateToISOWithTime(finalDateAndHour.toString())} />
                    <input type="hidden" name="patientID" value={user?.patient?.id} />
                    <LoadingOverlay status={status} />
                    {!hasSelectedDate && <Calendar
                        onClickDay={setDate}
                        className="rounded-xl !border-white !w-full"
                        formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'narrow' })}
                        minDate={new Date()}
                    />}
                    {date && 
                    <div className="text-center">
                        <span className="text-sm text-primary-800">Fecha Seleccionada</span>
                        <p className="font-raleway text-2xl font-medium text-primary-700">{ convertToReadableDate(date.toString()) } {hasSelectedDate && hour}</p>                    
                    </div>
                    }
                    {!hasSelectedDate && <TextInput onChange={setHour} name="startHour" type="time" label="Hora de la Cita" />}
                    {!hasSelectedDate && <Button onClick={handleVerifyAvailability} type="button" color="gray" label="Verificar Disponibilidad" className="justify-center" />}
                    {hasSelectedDate && (
                        <>
                            <VisualSelect name="modality" options={modalityOptions} />
                            <TextInput required name="reason" label="Motivo de la Cita" placeholder="Motivo de la cita" />
                            <TextAreaInput required name="notes" label="Notas" placeholder="Notas adicionales" />
                        </>
                    )}
                </div>
                <div className="flex justify-end gap-2 p-4">
                    <Button disabled={!hasSelectedDate} color="blue" label="Aceptar" type="submit" />
                    <Button color="red" label="Cancelar" type="button" onClick={onClose} />
                </div>
            </form>
        </Modal>
    )
}