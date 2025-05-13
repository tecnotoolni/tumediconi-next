import Status from "./Status";

export enum MetadataType {
    language = "language",
    specialty = "specialty",
    business_hours = "business_hours",
}

export interface Metadata {
    id: number;
    value: string;
    description?: string;
    status: Status;
    type: MetadataType;
    createdAt?: Date;
    updatedAt?: Date;
    removedAt?: Date;
}
