"use client";

import { Toaster, ToastBar } from "react-hot-toast";
import { Renderable } from "react-hot-toast";
import { ToastType } from "react-hot-toast/headless";
import { IconType } from "react-icons";
import { TbCircleCheck, TbCircleDot, TbCircleX, TbCircleDashed  } from "react-icons/tb";

export default function ToastProvider() {
  return (
    <Toaster
      toastOptions={{
        duration: 3000,
        position: "bottom-right",
        iconTheme: {
          primary: "var(--color-primary-600)",
          secondary: "var(--color-white)",
        },
        className:
          "w-full max-w-[400px] w-full *:justify-start text-primary-400 !p-0 overflow-hidden",
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ message }) => (
            <ToastStyler message={message} type={t.type} />
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}


function ToastStyler({ message, type }: { message: Renderable, type: ToastType }) {

  const typeProvider: Record<ToastType, {
    icon: IconType;
    color: string;
    border: string;
  }> = {
    success: {
      icon: TbCircleCheck,
      color: "text-green-500",
      border: "border-green-400",
    },
    error: {
      icon: TbCircleX,
      color: "text-red-500",
      border: "border-red-400",
    },
    loading: {
      icon: TbCircleDashed,
      color: "text-primary-500",
      border: "border-primary-500",
    },
    blank: {
      icon: TbCircleDot,
      color: "text-gray-500",
      border: "bg-gray-100",
    },
    custom: {
      icon: TbCircleDot,
      color: "text-gray-500",
      border: "border-gray-500",
    }
  }

  if (type == "custom" ){ 
    return (
      <div className="flex items-center p-2 rounded-lg">
        {message}
      </div>
    );
  } 

  const { icon: Icon, color, border } = typeProvider[type];

  return (
    <div className={`flex items-center p-2 rounded-lg z-50 border-l-4 ${border}`}>
      <Icon className={`${color} text-xl ${type == "loading" ? "animate-spin" : ""}`} />
      <span className="flex-1">{message}</span>
    </div>
  );
}
