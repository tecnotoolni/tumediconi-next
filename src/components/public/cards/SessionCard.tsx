"use client"

import Avatar from "@/components/common/ui/Avatar";
import routes from "@/sources/routes";
import { UseAuthStore } from "@/store/useAuthStore";
import Link from "next/link";

export default function SessionCard() {

    const { user } = UseAuthStore();

    return(
        <Link className="relative z-20 flex gap-1 p-2 rounded-xl items-center bg-primary-50/50 hover:bg-primary-100 transition-all active:scale-95" href={routes.dashboard} >
            <Avatar url={user && user ? routes.api.base + user?.avatar?.fileUrl : ""}  className="size-6" />
            <div className="flex flex-col">
                <span className="font-raleway text-xl">{ user?.username ? user.username : "Iniciar Sesión" }</span>
            </div>
        </Link>
    )
}