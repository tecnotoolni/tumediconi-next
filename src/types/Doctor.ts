import Status from "./Status";

export interface Doctor {
    id: number;
    firstName: string;
    lastName: string;
    notes?: string;
    activeSince: Date;
    locationID: number;
    status: Status;
    createdAt?: Date;
    updatedAt?: Date;
    removedAt?: Date;
}