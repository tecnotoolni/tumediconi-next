"use client";
import { useState } from "react";
import { IconType } from "react-icons";

interface Option {
  value: string;
  label: string;
  icon: IconType
}

interface Props {
  inline?: boolean
  label: string;
  name: string;
  options: Option[];
  onChange?: (value: string) => void;
}

export default function VisualSelect({name, label, options, onChange }: Props) {
  const [selectedValue, setSelectedValue] = useState<string>(options[0].value);

  const handleClick = (value: string) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-cool-gray-700 font-medium leading-tight text-center">{label}</label>
      <input type="hidden" name={name} value={selectedValue || ''} />
      <div className="flex gap-2 p-2 border border-cool-gray-200 rounded-lg">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleClick(option.value)}
            className={`p-4 border flex items-center flex-col cursor-pointer transition-all rounded-lg active:scale-95 ${selectedValue === option.value ? 'bg-primary-700 hover:bg-primary-600 text-white' : 'border-cool-gray-100 hover:bg-cool-gray-50 text-primary-700'}`}
          >
            <option.icon strokeWidth={2} />
            <span className="font-light">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
