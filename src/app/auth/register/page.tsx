"use client";
import SiteIdentifierTitle from "@/components/common/SiteIdentifier";
import Button from "@/components/common/ui/Button";
import TextInput from "@/components/common/ui/TextInput";
import es from "@/sources/lang.es";
import { getErrorMessage } from "@/utils/getErrorMessage";
import toast from "react-hot-toast";
import { FiLogIn } from "react-icons/fi";
import VisualSelect from "@/components/common/ui/VisualSelect";
import { TbStethoscope, TbUser } from "react-icons/tb";
import { useState } from "react";
import { ApiResponse } from "@/types/ApiResponse";
import { User } from "@/types/User";
import { redirect } from "next/navigation";
import routes from "@/sources/routes";

export default function AuthLogin() {
  const [title, setTitle] = useState(es.register.title);
  const [disabledButton, setDisabledButton] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [dataError, setDataError] = useState<{
    email: string | null;
    username: string | null;
    password: string | null;
    confirmPassword: string | null;
  }>({
    email: null,
    username: null,
    password: null,
    confirmPassword: null,
  });

  const options = [
    {
      icon: TbStethoscope,
      value: "patient",
      label: "Encontrar un Médico",
    },
    {
      icon: TbUser,
      value: "doctor",
      label: "Encontrar Pacientes",
    },
  ];

  const setError = (field: string, message: string) => {
    setDataError((prev) => ({
      ...prev,
      [field]: message,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email") as string;
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirm-password") as string;
      const role = formData.get("role") as string;
      setDisabledButton(true);

      const validations = {
        email: {
          value: email,
          message: "El correo electrónico es obligatorio",
        },
        username: {
          value: username,
          message: "El nombre de usuario es obligatorio",
        },
        password: {
          value: password,
          message: "La contraseña es obligatoria",
        },
        confirmPassword: {
          value: confirmPassword,
          message: "La confirmación de la contraseña es obligatoria",
        },
      };

      for (const [field, { value, message }] of Object.entries(validations)) {
        if (!value) {
          setError(field, message);
          return;
        }
      }

      if (password !== confirmPassword) {
        setError("confirm-password", "Las contraseñas no coinciden");
        return;
      }

      toast.loading("Registrándose...");

      const res = await fetch(routes.api.client.register, {
        method: "POST",
        body: JSON.stringify({ username, password, email, role }),
        headers: { "Content-Type": "application/json" },
      });

      const meta = (await res.json()) as ApiResponse<{ user: User }>;

      if (!meta.success) {
        throw new Error(meta.error?.message);
      }

      toast.success("Se ha registrado correctamente");

      setTimeout(() => {
        redirect(routes.authentication.login);
      });

      setTitle(es.register.success.title);
      setStatus("success");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
      setDisabledButton(false);
    }
  };

  return (
    <main className="flex justify-center items-center size-full">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="border border-primary-200 p-8 rounded-2xl max-w-md w-full"
      >
        <SiteIdentifierTitle name={title} />
        {status != "success" ? (
          <>
            <div className="flex flex-col gap-4 mb-4">
              <VisualSelect
                label="Selecciona una opción"
                name="role"
                options={options}
              />
              <TextInput
                error={dataError.email}
                label="Correo Electrónico"
                name="email"
              />
              <TextInput
                error={dataError.username}
                label="Nombre de Usuario"
                name="username"
              />
              <TextInput
                error={dataError.password}
                type="password"
                label="Contraseña"
                name="password"
              />
              <TextInput
                error={dataError.confirmPassword}
                type="password"
                label="Confirmar Contraseña"
                name="confirm-password"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                disabled={disabledButton}
                color="blue"
                icon={FiLogIn}
                label="Iniciar Sesión"
                className="w-full justify-center"
                type="submit"
              />
            </div>
          </>
        ) : (
          <SuccessMessage />
        )}
      </form>
    </main>
  );
}

const SuccessMessage = () => {
  return (
    <div className="flex flex-col gap-4">
      <p>{es.register.success.message}</p>
      <Button
        className="justify-center"
        color="blue"
        label="Acceder Ahora"
        type="button"
        onClick={() => redirect(routes.authentication.login)}
      />
    </div>
  );
};
