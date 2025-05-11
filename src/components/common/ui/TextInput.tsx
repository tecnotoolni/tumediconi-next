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
    <div className="flex flex-col gap-1">
        <label className="text-gray-600 leading-tight font-medium" htmlFor={name}>{label}</label>
        <input
            name={name}
            type={type}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange && onChange(e.target.value)}
            placeholder={placeholder}
            className="p-2 bg-shades-100 border border-cool-gray-100 text-gray-700 rounded-lg"
        />
    </div>    
  );
}
