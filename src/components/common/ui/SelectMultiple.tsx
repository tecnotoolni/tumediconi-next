"use client"
import Option from "@/types/Option";
import React, { useEffect, useRef, useState } from "react";
import { TbChevronDown, TbSearch, TbX } from "react-icons/tb";

interface Props {
  label?: string;
  value?: string[];
  onChange: (value: string[]) => void;
  error?: string;
  placeholder: string;
  required?: boolean;
  name: string;
  options?: Option[];
  enableSearch?: boolean;
}

export default function SelectMultiple({
  value = [],
  onChange,
  error,
  placeholder,
  required = false,
  name,
  options = [],
  enableSearch = false,
  label
}: Props) {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    onChange(selectedOptions);
  };

  const [showOptions, setShowOptions] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setShowOptions(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  const toggleOption = (val: string | number) => {
    const newValue: string[] = value.includes(val as string)
      ? value.filter((item) => item !== val)
      : [...value, val as string];
    onChange(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.stopPropagation();
    }
  }

  const ButtonOption: React.FC<{ option: Option }> = ({ option }) => {
    const isSelected = value.includes(option.value as string);
    const isHidden =
      searchValue &&
      !option.label.toLowerCase().includes(searchValue.toLowerCase());
    const isHighlighted =
      searchValue &&
      option.label.toLowerCase().includes(searchValue.toLowerCase());

    const buttonClasses = [
      "flex items-center px-2 py-1 transition-all",
      isHidden ? "hidden" : "hover:bg-cool-gray-50",
      isSelected ? "disabled:opacity-20" : "",
      isHighlighted ? "bg-cool-gray-50" : "",
    ]
    .filter(Boolean)
    .join(" ");

    return (
      <button
        type="button"
        key={option.value}
        className={buttonClasses}
        onClick={() => toggleOption(option.value)}
        disabled={isSelected}
      >
        <span className="text-cool-gray-600">{option.label}</span>
      </button>
    );
  };

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1">
      <span className="text-gray-600 leading-tight font-medium">{label}</span>
      {error && (
        <span className="text-red-500 text-sm font-medium">{error}</span>
      )}
      <ul onClick={() => { setShowOptions(!showOptions) }} onKeyDown={handleKeyDown} role="button" tabIndex={0}
        className={`relative border border-cool-gray-100 w-full flex-1 rounded-lg flex flex-wrap gap-2 py-2 pl-2 pr-8 ${
          error ? "border-red-500" : "border-primary-150"
        } ${showOptions ? "rounded-b-none" : ""}`}
      >
        {value.length === 0 && (
          <span className="text-cool-gray-600 leading-tight pointer-events-none select-none">{placeholder}</span>
        )}
        {value.map((val) => {
          const selectedOption = options.find((option) => option.value === val);

          return (
            <li
              key={val}
              className="flex items-center z-30 cursor-default border border-cool-gray-100 rounded-sm"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                }
              }}
              role="button"
              tabIndex={0}
            >
              <span className="text-cool-gray-700 px-2 py-0.5">
                {selectedOption?.label}
              </span>
              <button
                type="button"
              className="flex justify-center items-center px-2 h-full focus:outline-none bg-red-100 text-red-600 cursor-pointer hover:bg-red-200 transition-all"
                onClick={() => toggleOption(val)}
              >
                <TbX />
              </button>
            </li>
          );
        })}
        <div
          className={`flex size-4 absolute top-1 right-2 translate-y-1/2 transition-all text-cool-gray-700 ${
            showOptions ? "rotate-180" : ""
          }`}
        >
          <TbChevronDown />
        </div>
      </ul>
      <div
        className={`absolute top-full transition-all z-40 border-t-0 border-cool-gray-200 bg-white w-full flex flex-col border border-primary-150 rounded-b-md  overflow-auto ${
          showOptions ? "max-h-60" : "opacity-0 max-h-0"
        }`}
      >
        {enableSearch && (
          <div className="sticky z-20 items-center gap-2 text-primary-150 bg-white top-0 flex p-2 border-b border-cool-gray-100 shadow-sm">
            <TbSearch />
            <input
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              className="flex-1 placeholder:text-primary-150 outline-none text-cool-gray-600"
              type="text"
              placeholder="Buscar"
            />
          </div>
        )}
        {options.map((option) => (
          <ButtonOption key={option.value} option={option} />
        ))}
      </div>
      <select
        multiple
        required={required}
        className="hidden"
        value={value}
        onChange={handleSelectChange}
        name={name}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

}
