"use client";
import { ChangeEvent, useEffect, useState } from "react";

interface Props {
    label: string;
    name: string;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    type?: "text" | "email" | "password" | "number" | "date" | "time";
    error?: string | null;
    disabled?: boolean;
    required?: boolean;
}

export default function TextInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  disabled,
  required,
}: Props) {
  const [currentValue, setCurrentValue] = useState(value || "");

  useEffect(() => {
    setCurrentValue(value || "");
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-gray-600 leading-tight font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        type={type}
        value={currentValue}
        disabled={disabled}
        onChange={handleChange}
        placeholder={placeholder}
        className={`p-1.5 bg-shades-100 border disabled:bg-cool-gray-100 disabled:opacity-20 ${
          error ? "border-red-200 bg-red-100 text-red-600" : "border-cool-gray-100"
        } text-gray-700 rounded-lg`}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}
