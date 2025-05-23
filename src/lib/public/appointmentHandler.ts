import es from "@/sources/lang.es";
import { ApiResponse } from "@/types/ApiResponse";
import { Appointment } from "@/types/Appointment";

export default class AppointmentPublicHandler {

    static async verifyAvailability(doctorID: number | null, date: Date) {
        const response = await fetch(`/api/public/doctors/${doctorID}/verify-appointment`, {
            method: "POST",
            body: JSON.stringify({
                doctorID,
                date
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(es.appointment.error.post_verify_unknown);
        }

        return await response.json() as ApiResponse<Appointment[]>;
    }

}