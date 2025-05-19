import Status from "./Status";

export interface Interaction {
    id: number;
    doctorID: number;
    patientID: number;
    name: string;
    interactionType: InteractionType;
    interactionDate: Date;
    notes: string;
    status: Status;
    creationAction: string;
    createdAt: Date;
    updatedAt: Date | null;
    removedAt: Date | null;
}

export enum InteractionType {
  call = "call",
  email = "email",
  meeting = "meeting",
  follow_up = "follow_up",
  prescription = "prescription",
  lab_result = "lab_result",
}

export enum CreationActionType {
  automated = "automated",
  manual = "manual",
}