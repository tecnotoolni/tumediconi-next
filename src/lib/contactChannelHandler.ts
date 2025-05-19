import es from "@/sources/lang.es";
import { ApiResponse } from "@/types/ApiResponse";
import { ContactChannel } from "@/types/ContactChannel";

interface CreateContactChannelProps {
    data: {
        createdBy: FormDataEntryValue | null,
        patientID: FormDataEntryValue | null,
        name: FormDataEntryValue | null,
        notes: FormDataEntryValue | null,
        type: FormDataEntryValue | null,
        value: FormDataEntryValue | null,
    }
}

export async function createContactChannel({data}: CreateContactChannelProps) {

    const response = await fetch(`/api/contact-channels/patients/${data.patientID}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (!response.ok) {
        throw new Error(es.contact_channel.error.post_unknown);
    }

    return await response.json() as ApiResponse<ContactChannel>;
}


interface UpdateContactChannelProps {
    data: {
        id: FormDataEntryValue | null,
        name: FormDataEntryValue | null,
        notes: FormDataEntryValue | null,
        type: FormDataEntryValue | null,
        value: FormDataEntryValue | null,
    }
}

export async function updateContactChannel({data}: UpdateContactChannelProps) {

    const response = await fetch(`/api/contact-channels/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (!response.ok) {
        throw new Error(es.contact_channel.error.put_unknown);
    }

    return await response.json() as ApiResponse<ContactChannel>;
}

export async function deleteContactChannel(id: FormDataEntryValue | null) {
    const response = await fetch(`/api/contact-channels/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (!response.ok) {
        throw new Error(es.contact_channel.error.delete_unknown);
    }

    return await response.json() as ApiResponse<ContactChannel>;
}