import es from "@/sources/lang.es";
import { ApiResponse } from "@/types/ApiResponse";
import { Service } from "@/types/Service";


export async function getServicesByDoctorID(doctorID: number) {

    const response = await fetch(`/api/services/doctors/${doctorID.toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(es.service.error.get_unknown);
    }

    return await response.json() as ApiResponse<Service[]>;
}

interface CreateServiceProps {
    doctorID?: FormDataEntryValue | null,
    data: {
        basePrice: FormDataEntryValue | null,
        description: FormDataEntryValue | null,
        name: FormDataEntryValue | null,
    }
}

export async function createService({ doctorID, data }: CreateServiceProps) {
    const response = await fetch(`/api/services/doctors/${doctorID}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(es.service.error.post_unknown);
    }

    return await response.json() as ApiResponse<Service>;
}

interface UpdateServiceProps {
    id?: FormDataEntryValue | null,
    data: {
        basePrice: FormDataEntryValue | null,
        description: FormDataEntryValue | null,
        name: FormDataEntryValue | null,
    }
}

export async function updateService({ id, data }: UpdateServiceProps) {
    const response = await fetch(`/api/services/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(es.service.error.post_unknown);
    }

    return await response.json() as ApiResponse<Service>;
}

export async function deleteService(id: number) {
    const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(es.service.error.delete_unknown);
    }

    return await response.json() as ApiResponse<Service>;
}

export async function toggleServiceByID(id: number) {
    const response = await fetch(`/api/services/${id}/toggle`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(es.service.error.put_unknown);
    }

    return await response.json() as ApiResponse<Service>;
}
