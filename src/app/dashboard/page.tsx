"use client";
import { UseAuthStore } from "@/store/useAuthStore";

export default function Dashboard() {

    const { user } = UseAuthStore();

    console.log(user)

    return (
        <main className="flex justify-center items-center size-full">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div>
                <p className="text-lg">Bienvenido, {user?.username}</p>
                <p className="text-lg">Tu correo es: {user?.email}</p>
                <p className="text-lg">Tu ID es: {user?.id}</p>
            </div>
        </main>
    );
}