"use client";
import es from "@/sources/lang.es";
import { useEffect, useState } from "react";
import { TbCircleDashed } from "react-icons/tb";

interface Props {
    className?: string;
    message?: string;
    duration?: number;
}

export default function LoadingSpinner({ className, message = es.others.taking_more_time, duration = 3000 }: Props) {
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowMessage(true);
        }, duration);
    })

    return (
        <div className={`flex justify-center flex-col gap-2 text-center items-center size-full z-50 ${className || ""}`}>
            <TbCircleDashed className="animate-spin text-primary-500 text-4xl" />
            {showMessage && <p className="text-sm text-primary-500 z-40">{message}</p>}
        </div>
    )
}