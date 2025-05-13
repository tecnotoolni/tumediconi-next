"use client";
import { UseAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { TbCircleDashed } from "react-icons/tb";
import { UserRole } from "@/types/User";
import { redirect } from "next/navigation";
import routes from "@/sources/routes";

export default function Dashboard() {
    const { user } = UseAuthStore();
    const [start, setStart] = useState(false);

    useEffect(() => {
        if (!user) return;

        const isAdmin = user.role === UserRole.admin;
        const isDoctorWithoutProfile = user.role === UserRole.doctor && !user.doctor;
        const isPatientWithoutProfile = user.role === UserRole.patient && !user.patient;

        console.log({user, isAdmin, isDoctorWithoutProfile, isPatientWithoutProfile});
        console.log(UserRole.patient)

        if (!isAdmin && (isDoctorWithoutProfile || isPatientWithoutProfile)) {
            redirect(routes.authentication.finish);
        }

        setStart(true)
    }, [user]);


    if (!start) {
        return(
            <main className="flex justify-center items-center size-full">
                <TbCircleDashed className="animate-spin text-primary-500 text-4xl" />
            </main>
        )
    }

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