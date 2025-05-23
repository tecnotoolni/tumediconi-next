import { Doctor } from "./Doctor";
import { Patient } from "./Patient";
import { Service } from "./Service";

export enum AppointmentStatus {
    pending = "pending",
    scheduled = "scheduled",
    canceled = "canceled",
    completed = "completed",
    deleted = "deleted",
}

export const AppointmentStatusRead = {
    [AppointmentStatus.pending]: "Pendiente",
    [AppointmentStatus.scheduled]: "Programado",
    [AppointmentStatus.canceled]: "Cancelada",
    [AppointmentStatus.completed]: "Completada",
    [AppointmentStatus.deleted]: "Eliminada",
}

export enum ModalityType {
    face_to_face = "face_to_face",
    virtual = "virtual" 
}

export const ModalityTypeRead = {
    [ModalityType.face_to_face]: "Presencial",
    [ModalityType.virtual]: "Virtual"
}

export interface Appointment {
    id: number;
    doctorID: number;
    patientID: number;
    appointmentDate: Date;
    modality: ModalityType;
    serviceOrderID?: number;
    serviceID?: number;
    status: AppointmentStatus;
    reason?: string;
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
    removedAt?: Date;

    service?: Service
    doctor?: Doctor
    patient?: Patient
}
