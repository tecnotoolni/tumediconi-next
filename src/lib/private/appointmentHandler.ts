import es from "@/sources/lang.es"
import { ApiResponse } from "@/types/ApiResponse"
import { Appointment } from "@/types/Appointment"

interface CreateProps {
    doctorID: FormDataEntryValue | null,
    data: {
        reason: FormDataEntryValue | null,
        notes: FormDataEntryValue | null,
        modality: FormDataEntryValue | null,
        appointmentDate: FormDataEntryValue | null,
        serviceID: FormDataEntryValue | null,
    }
}

export default class AppointmentHandler {

    static async create({ doctorID, data }: CreateProps) {

        const response = await fetch(`/api/appointments/doctors/${doctorID}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!response.ok) {
            throw new Error(es.appointment.error.post_unknown)
        }

        return await response.json() as ApiResponse<Appointment>
    }

}