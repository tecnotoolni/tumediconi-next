import es from "@/sources/lang.es";
import { ApiResponse } from "@/types/ApiResponse";
import FileData from "@/types/FileData";

interface Props {
    file?: File;
    name?: string;
    description?: string;
    isPrivate?: boolean;
}

export default async function fileUploadHandler({file, name, description, isPrivate}: Props) {

    const formData = new FormData();

    if (file) {
        formData.append("file", file);
    }

    if (name) formData.append("name", name);
    if (description) formData.append("description", description);
    if (isPrivate) formData.append("isPrivate", "true");


    const response = await fetch("/api/files/upload", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error(es.upload.error.unknown);
    }

    return await response.json() as ApiResponse<FileData>;
}