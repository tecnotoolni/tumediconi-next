import Avatar from "@/components/common/ui/Avatar";
import IconButton from "@/components/common/ui/IconButton";
import routes from "@/sources/routes";
import { Appointment, AppointmentStatusRead, ModalityTypeRead } from "@/types/Appointment";
import { TbEdit, TbTrash } from "react-icons/tb";


interface Props {
    appointment: Appointment;
    handleModifyAppointment: (appointment: Appointment) => void;
    handleDeleteAppointment: (appointment: Appointment) => void;
}

export default function PatientSideAppointmentCard({ appointment, handleModifyAppointment, handleDeleteAppointment }: Props) {

    const statusColor = {
        pending: "bg-primary-100 text-primary-800",
        scheduled: "bg-green-100 text-green-600",
        canceled: "bg-red-100 text-red-800",
        completed: "bg-green-100 text-green-600",
        deleted: "bg-red-100 text-red-800",
    }

    return(
        <li className="flex gap-2 items-center">
            <div className="flex gap-4 text-cool-gray-700 items-center border border-cool-gray-100 rounded-lg *:p-2 w-full">
                <div className="w-16">
                    <Avatar url={routes.api.base + appointment.doctor?.user?.avatar?.fileUrl} className="size-8" />
                </div>
                <div className="flex-1 flex flex-col">
                    <span>{appointment.doctor?.firstName}</span>
                    <span>{appointment.doctor?.lastName}</span>
                </div>
                <div className="flex-1">
                    <span>{appointment.service?.name}</span>
                </div>
                <div className="flex-1 flex flex-col">
                    <span>
                        {new Date(appointment.appointmentDate).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit"
                        })}
                    </span>
                    <span className="text-cool-gray-500">
                        {new Date(appointment.appointmentDate).toLocaleTimeString("es-ES", {
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                    </span>
                </div>
                <div className="flex-1 text-center">
                    <span>{ModalityTypeRead[appointment.modality]}</span>
                </div>
                <div className="flex-1 flex justify-center">
                    <span className={`py-2 px-4 rounded-full ${statusColor[appointment.status]}`}>{AppointmentStatusRead[appointment.status]}</span>
                </div>
                <div className="flex-1">
                    <span>{appointment.reason}</span>
                </div>
            </div>

            <div className="w-12 flex gap-2">
                <IconButton icon={TbEdit} onClick={() => handleModifyAppointment(appointment)} />
                <IconButton icon={TbTrash} onClick={() => handleDeleteAppointment(appointment)} />
            </div>
        </li>
    )

}