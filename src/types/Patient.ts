import { ContactChannel } from "./ContactChannel";
import { Municipality } from "./Geolocalization";
import { Interaction } from "./Interaction";
import { User } from "./User";

export enum GenderType {
    male = "male",
    female = "female",
}

export interface Patient {
    id: number;
    identityCard: string;
    firstName: string;
    lastName: string;
    birthDate?: Date;
    gender?: GenderType;
    phone?: string;
    address?: string;
    municipalityID?: number;
    status: PatientStatus;
    createdAt?: Date;
    updatedAt?: Date;
    removedAt?: Date;
    municipality?: Municipality;
    contactChannels?: ContactChannel[]
    user?: User
}

export interface PatientInteraction {
    patient: Patient,
    interactions: Interaction[]
}

export enum PatientStatus {
    prospect = "prospect",
    active = "active",
    disabled = "disabled",
    modified = "modified",
    deleted = "deleted",
}

export const PatientStatusRead = {
    prospect: "Prospecto",
    active: "Activo",
    disabled: "Deshabilitado",
    modified: "Modificado",
    deleted: "Eliminado",
}
