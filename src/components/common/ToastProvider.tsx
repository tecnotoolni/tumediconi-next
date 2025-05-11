"use client";

import { Toaster, ToastBar, toast } from "react-hot-toast";
import { FiX } from "react-icons/fi";

export default function ToastProvider() {
  return (
    <Toaster
      toastOptions={{
        position: "bottom-right",
        iconTheme: {
          primary: "var(--color-primary-600)",
          secondary: "var(--color-white)",
        },
        className:
          "w-full max-w-[480px] border-cool-gray-50 border *:justify-start text-primary-400",
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              <span className="flex-1 text-left text-primary-400">
                {message}
              </span>
              {t.type !== "loading" && (
                <button
                  className="text-primary-400 cursor-pointer hover:text-primary-700 hover:text-primary-150 active:scale-90 transition-all"
                  onClick={() => toast.dismiss(t.id)}
                >
                  <FiX className="size-4 transition-colors" />
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}
