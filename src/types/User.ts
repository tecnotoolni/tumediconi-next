import { Doctor } from "./Doctor";
import FileType from "./FileData";
import { Patient } from "./Patient";

export interface User {
    id: number;
    username: string;
    email: string;
    role: UserRole;
    doctorID: number | null;
    patientID: number | null;
    status: UserStatus;
    avatarID: number | null;
    createdAt: Date;
    updatedAt: Date;
    removedAt: Date | null;
    lastLogin: Date | null;
    avatar: FileType | null;
}

export interface UserAuthenticated {
    id: number;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    avatar: FileType | null;
    doctor: Doctor | null;
    patient: Patient | null;
}

export enum UserRole {
    admin = "admin",
    doctor = "doctor",
    patient = "patient"
}

export type UserStatus = "active" | "inactive" | "blocked";