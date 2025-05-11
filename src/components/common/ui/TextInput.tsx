"use client";
import { ChangeEvent } from "react";

interface Props {
    label: string;
    name: string;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string | undefined
    type?: "text" | "email" | "password";
}

export default function TextInput({ label, name, value, onChange, placeholder, type = "text"}: Props) {
  return (
    <div className="flex flex-col gap-1 text-shades-200">
        <label className="text-sm" htmlFor={name}>{label}</label>
        <input
            name={name}
            type={type}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange && onChange(e.target.value)}
            placeholder={placeholder}
            className="p-2 bg-shades-100 border border-primary-200 rounded-lg"
        />
    </div>    
  );
}
