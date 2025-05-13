"use client";
import { ChangeEvent } from "react";

interface Props {
    label: string;
    name: string;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    error?: string | null;
    disabled?: boolean;
}

export default function TextAreaInput({ label, name, value, onChange, placeholder, error, disabled }: Props) {
  return (
    <div className="flex flex-col gap-1">
        <label className="text-gray-600 leading-tight font-medium" htmlFor={name}>{label}</label>
        <textarea
            name={name}
            value={value}
            disabled={disabled}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange && onChange(e.target.value)}
            placeholder={placeholder}
            className={`p-1.5 bg-shades-100 border min-h-20 disabled:bg-cool-gray-100 disabled:opacity-20 ${error ? 'border-red-200 bg-red-100 text-red-600' : 'border-cool-gray-100'} text-gray-700 rounded-lg`}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}
