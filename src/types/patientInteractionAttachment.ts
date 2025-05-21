import FileData from "./FileData";

export interface PatientInteractionAttachment {
    id: number;
    patientInteractionID: number;
    fileID: number;
    type: string,
    createdAt: Date;
    updatedAt: Date | null;
    removedAt: Date | null;

    file?: FileData
}