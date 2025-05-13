import es from "@/sources/lang.es";
import { ApiResponse } from "@/types/ApiResponse";
import { Doctor } from "@/types/Doctor";

interface CreateDoctorProps {
    data: {
        avatarID: FormDataEntryValue | null,
        firstName: FormDataEntryValue | null,
        lastName: FormDataEntryValue | null,
        gender: FormDataEntryValue | null,
        activeSince: FormDataEntryValue | null,
        specialtyID: FormDataEntryValue | null,
        municipaltyID: FormDataEntryValue | null,
        languages: FormDataEntryValue[] | null,
        aproximateAddress: FormDataEntryValue | null,
        businessHours: FormDataEntryValue[] | null
    }
}

export async function createDoctor({ data } : CreateDoctorProps) {

    const response = await fetch("/api/doctors/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(es.doctor.error.unknown);
    }

    return await response.json() as ApiResponse<Doctor>;
}