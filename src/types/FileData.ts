import Status from "./Status";

export default interface FileData {
    id: number;
    name: string | null;
    description: string | null;
    fileUrl: string | null;
    size: number | null;
    type: string | null;
    isPrivate: boolean;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
    removedAt: Date | null;
}