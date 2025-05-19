import Status from "./Status";

export interface ContactChannel {
    id: number;
    patientID: number;
    createdBy: number;
    type: ContactChannelType;
    name: string;
    value: string;
    notes: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date | null;
    removedAt: Date | null;
}

export enum ContactChannelType {
    social_media = "social_media",
    phone = "phone",
    email = "email",
}