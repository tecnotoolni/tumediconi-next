"use client";
import { ChangeEvent, useEffect, useState } from "react";

interface Props {
  label: string;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string | null;
  disabled?: boolean;
  required?: boolean;
  prefix?: string;
}

export default function PriceInput({
  label,
  name,
  value,
  onChange,
  placeholder = "0.00",
  error,
  disabled,
  required,
  prefix = "C$",
}: Props) {
  const [currentValue, setCurrentValue] = useState(value || "");

  useEffect(() => {
    setCurrentValue(value || "");
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (/^\d*\.?\d{0,2}$/.test(inputValue) || inputValue === "") {
      setCurrentValue(inputValue);
      onChange?.(inputValue);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-600 leading-tight font-medium" htmlFor={name}>{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          {prefix}
        </span>
        <input
          id={name}
          name={name}
          required={required}
          type="text"
          value={currentValue}
          disabled={disabled}
          onChange={handleChange}
          placeholder={placeholder}
          className={`p-1.5 bg-shades-100 border disabled:bg-cool-gray-100 disabled:opacity-20 ${
            error ? "border-red-200 bg-red-100 text-red-600" : "border-cool-gray-100"
          } text-gray-700 rounded-lg w-full pl-9`}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
