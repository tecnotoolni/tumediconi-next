import { useEffect, useState } from "react";

interface Props {
    label?: string;
    checked?: boolean;
    name: string;
    value?: boolean;
    slug: string;
    onChecked?: (checked: boolean) => void;
}

export default function SwitchInput({ label, name, checked = false, slug, onChecked }: Props) {
    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = e.target.checked;
        setIsChecked(newChecked);
        if (onChecked) {
            onChecked(newChecked);
        }
    };

    return (
        <div className="flex items-center justify-between">
            {label && <span className="text-primary-200">{label}</span>}
            <div className="relative flex">
                <input
                    id={slug}
                    type="checkbox"
                    checked={isChecked}
                    name={name}
                    onChange={handleChange}
                    className="peer appearance-none w-12 h-6 bg-cool-gray-600 rounded-lg checked:bg-primary-600 cursor-pointer transition-colors duration-300"
                />
                <label
                    htmlFor={slug}
                    className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-md transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
                />
            </div>
        </div>
    );
}
