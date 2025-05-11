export interface User {
    id: number;
    avatarFileId: number | null;
    username: string;
    email: string;
    password: string;
    name: string | null;
    lastname: string | null;
    role: UserRole;
    createdAt: Date;
    status: UserStatus;
}

export type UserRole = "dev" | "admin" | "worker";
export type UserStatus = "active" | "inactive" | "deleted";