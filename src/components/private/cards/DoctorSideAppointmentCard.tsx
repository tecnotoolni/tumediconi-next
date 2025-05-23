import Avatar from "@/components/common/ui/Avatar";
import IconButton from "@/components/common/ui/IconButton";
import routes from "@/sources/routes";
import { Appointment, AppointmentStatus, AppointmentStatusRead, ModalityTypeRead } from "@/types/Appointment";
import { TbEdit, TbTrash } from "react-icons/tb";


interface Props {
    appointment: Appointment;
    handleModifyAppointment: (appointment: Appointment) => void;
    handleDeleteAppointment: (appointment: Appointment) => void;
}

export default function DoctorSideAppointmentCard({ appointment, handleModifyAppointment, handleDeleteAppointment }: Props) {

    const statusColor = {
        pending: "bg-primary-100 text-primary-800",
        scheduled: "bg-green-100 text-green-600",
        canceled: "bg-red-100 text-red-800",
        completed: "bg-green-100 text-green-600",
        deleted: "bg-red-100 text-red-800",
    }

    return(
        <li className="relative flex gap-4 text-cool-gray-700 flex-col border border-cool-gray-100 rounded-lg p-4 w-full">
                <Avatar url={appointment.patient?.user ? (routes.api.base + appointment.patient?.user?.avatar?.fileUrl) : ""} className="size-32" />
                <div className="text-xl font-raleway">
                    <span>{appointment.patient?.firstName} {appointment.patient?.lastName}</span>
                </div>
                <ul className="grid grid-cols-2 gap-4">
                    <li className="flex flex-col text-">
                        <span className="font-raleway text-primary-500">Servicio Solicitado</span>
                        <span>{appointment.service?.name}</span>
                    </li>
                    <li className="flex-1 flex flex-col">
                        <span className="font-raleway text-primary-500">Fecha Programada</span>
                        <span>
                            {new Date(appointment.appointmentDate).toLocaleString("es-ES", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                        </span>
                    </li>
                </ul>
                <div className="flex-1 flex justify-center top-4 right-4 absolute">
                    <span className={`py-2 px-4 rounded-full ${statusColor[appointment.status]}`}>{AppointmentStatusRead[appointment.status]}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex-1 flex flex-col">
                        <span className="font-raleway text-primary-500">Razón de Cita</span>
                        <span>{appointment.reason}</span>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <span className="font-raleway text-primary-500">Modalidad</span>
                        <span>{ModalityTypeRead[appointment.modality]}</span>
                    </div>
                </div>
                <div className="flex-1 flex flex-col">
                    <span className="font-raleway text-primary-500">Notas Adicionales</span>
                    <span>{appointment.notes}</span>
                </div>
            {appointment.status != AppointmentStatus.canceled && <div className="w-12 flex gap-2 ml-auto">
                <IconButton icon={TbEdit} onClick={() => handleModifyAppointment(appointment)} />
                <IconButton icon={TbTrash} onClick={() => handleDeleteAppointment(appointment)} />
            </div>}
        </li>
    )

}