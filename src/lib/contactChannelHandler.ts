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