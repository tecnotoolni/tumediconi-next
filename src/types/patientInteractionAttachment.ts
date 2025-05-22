import FileData from "./FileData";

export interface InteractionAttachments {
    id: number;
    patientInteractionID: number;
    fileID: number;
    type: string,
    createdAt: Date;
    updatedAt: Date | null;
    removedAt: Date | null;

    file?: FileData
}