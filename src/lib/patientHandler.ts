import es from "@/sources/lang.es";
import { ApiResponse } from "@/types/ApiResponse";
import { Patient } from "@/types/Patient";

export async function getPatientsByDoctorAsignment(doctorID: number) {
    const response = await fetch(`/api/doctors/${doctorID.toString()}/patients`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(es.doctor.error.unknown);
    }

    return await response.json() as ApiResponse<Patient[]>;
}