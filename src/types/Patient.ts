import Status from "./Status";

export enum GenderType {
    male = "male",
    female = "female",
}

export interface Patient {
    id: number;
    identifier: string;
    firstName: string;
    lastName: string;
    birthDate?: Date;
    gender?: GenderType;
    phone?: string;
    address?: string;
    municipalityID?: number;
    status: Status;
    createdAt?: Date;
    updatedAt?: Date;
    removedAt?: Date;
}