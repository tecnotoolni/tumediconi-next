
export enum AppointmentStatus {
    scheduled = "scheduled",
    completed = "completed",
    canceled = "canceled",
    no_show = "no_show"
}

export enum ModalityType {
    face_to_face = "face_to_face",
    virtual = "virtual" 
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
}
