"use client";
import { ChangeEvent, useEffect, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface Props {
  label?: string;
  name: string;
  options: Option[];
  onChange?: (value: string) => void;
  value?: string;
  error?: string | null;
  disabled?: boolean;
  placeholder?: string;
  hidePlaceholder?: boolean;
  required?: boolean;
}

export default function SelectInput({ label, name, options, onChange, value, error, disabled, placeholder = "Selecciona una opción", hidePlaceholder, required }: Props) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  useEffect(() => {
    setSelectedValue(value || "")
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col gap-1">
        <label className="text-gray-600 leading-tight font-medium" htmlFor={name}>{label}</label>
        <select
        required={required}
        name={name}
        value={selectedValue || ""}
        onChange={handleChange}
        disabled={disabled}
        className={`p-2 border rounded-lg bg-shades-100 text-gray-700 ${error ? 'border-red-200 bg-red-100 text-red-600' : 'border-cool-gray-200'} ${disabled ? 'bg-cool-gray-100 opacity-50' : ''}`}
      >
        {!hidePlaceholder && <option value="" disabled>{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}
