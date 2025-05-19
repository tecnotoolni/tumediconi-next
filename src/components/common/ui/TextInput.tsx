"use client";
import { ChangeEvent, useEffect, useState } from "react";

interface Props {
    label: string;
    name: string;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    type?: "text" | "email" | "password" | "number" | "date";
    error?: string | null;
    disabled?: boolean;
    required?: boolean;
}

export default function TextInput({ label, name, value, onChange, placeholder, type, error, disabled, required }: Props) {

  const [currentValue, setCurrentValue] = useState(value)

  useEffect(() => {
    console.log(value)
    setCurrentValue(value)
  },[value])

  return (
    <div className="flex flex-col gap-1">
        <label className="text-gray-600 leading-tight font-medium" htmlFor={name}>{label}</label>
        <input
            name={name}
            required={required}
            type={type || "text"}
            value={currentValue}
            disabled={disabled}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange && onChange(e.target.value)}
            placeholder={placeholder}
            className={`p-1.5 bg-shades-100 border disabled:bg-cool-gray-100 disabled:opacity-20 ${error ? 'border-red-200 bg-red-100 text-red-600' : 'border-cool-gray-100'} text-gray-700 rounded-lg`}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}
