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

interface CreatePatientInteractionProps {
    doctorID: FormDataEntryValue | null,
    patientID: FormDataEntryValue | null,
    data: {
        name: FormDataEntryValue | null,
        interaction_date: FormDataEntryValue | null,
        notes: FormDataEntryValue | null,
        interaction_type: FormDataEntryValue | null,
        attachments: FormDataEntryValue[] | null
    }
}

export async function createPatientInteraction({ doctorID, patientID, data }: CreatePatientInteractionProps) {
    const response = await fetch(`/api/doctors/${doctorID}/patients/${patientID}/interactions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(es.doctor.error.post_unknown);
    }

    return await response.json() as ApiResponse<PatientInteraction>;
}