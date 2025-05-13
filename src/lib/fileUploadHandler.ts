import es from "@/sources/lang.es";
import { ApiResponse } from "@/types/ApiResponse";
import FileData from "@/types/FileData";

interface Props {
    file?: File;
    name?: string;
    description?: string;
}

export default async function fileUploadHandler({file, name, description}: Props) {

    const formData = new FormData();

    if (file) {
        formData.append("file", file);
    }

    if (name) formData.append("name", name);
    if (description) formData.append("description", description);


    const response = await fetch("/api/files/upload", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error(es.upload.error.unknown);
    }

    return await response.json() as ApiResponse<FileData>;
}