import { Metadata } from "./Metadata";
import { Service } from "./Service";
import Status from "./Status";
import { User } from "./User";

export interface Doctor {
    id: number;
    firstName: string;
    lastName: string;
    notes?: string;
    slug: string;
    activeSince: Date;
    locationID: number;
    status: Status;
    createdAt?: Date;
    updatedAt?: Date;
    removedAt?: Date;

    user?: User;
    services?: Service[];
    location?: Location;
    metadatas: {
        metadata: Metadata;
    }[];
    specialty: Metadata;
    
}