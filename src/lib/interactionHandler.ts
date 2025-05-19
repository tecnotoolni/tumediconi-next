import es from "@/sources/lang.es";
import { ApiResponse } from "@/types/ApiResponse";
import { PatientInteraction } from "@/types/Patient";

export async function getPatientInteractionByDoctor(doctorID: number, patientID: number) {
    const response = await fetch(`/api/doctors/${doctorID.toString()}/patients/${patientID}/interactions`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(es.doctor.error.unknown);
    }

    return await response.json() as ApiResponse<PatientInteraction>;
}