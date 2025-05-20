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

interface CreatePatientProspectProps {
    id?: FormDataEntryValue | null,
    data: {
        firstName: FormDataEntryValue | null,
        lastName: FormDataEntryValue | null,
        address: FormDataEntryValue | null,
        birthDate: FormDataEntryValue | null,
        gender: FormDataEntryValue | null,
        identityCard: FormDataEntryValue | null,
        municipaltyID: FormDataEntryValue | null,
        phone: FormDataEntryValue | null,
        doctorID: FormDataEntryValue | null,
    }
}

export async function createPatientProspect({ data } : CreatePatientProspectProps)  {
    const response = await fetch("/api/patients/prospect", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(es.patient.error.post_unknown);
    }

    return await response.json() as ApiResponse<Patient>;

}

export async function updatePatientProspect({ id, data } : CreatePatientProspectProps)  {

    console.log(id, data)
    const response = await fetch(`/api/patients/prospect/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(es.patient.error.put_unknown);
    }

    return await response.json() as ApiResponse<Patient>;
}

export async function deletePatientProspect(id: FormDataEntryValue | null) {
    const response = await fetch(`/api/patients/prospect/${Number(id)}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(es.patient.error.delete_unknown);
    }

    return await response.json() as ApiResponse<Patient>;
}