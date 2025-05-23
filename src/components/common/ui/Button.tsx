import { IconType } from 'react-icons';

interface Props {
    className?: string;
    disabled?: boolean;
    color: "red" | "gray" | "blue";
    label?: string;
    onClick?: () => void;
    icon?: IconType;
    type: "button" | "submit" | "reset";
}

export default function Button({ className, disabled, color, type, label, onClick, icon: Icon }: Props) {

    const definitions = {
        red: "text-red-600 bg-red-100 hover:bg-red-200",
        blue: "text-primary-800 bg-primary-100 hover:bg-primary-200",
        gray: "text-cool-gray-700 bg-cool-gray-50 hover:bg-cool-gray-100"
    }

    return ( 
        <button disabled={disabled} type={type} className={`${className} ${definitions[color]} select-none disabled:opacity-25 disabled:pointer-events-none px-3 font-medium py-2 active:scale-95 transition-all flex items-center gap-1 rounded-lg cursor-pointer`} onClick={onClick}>
            {Icon && <Icon strokeWidth={2} className="text-base" />}
            {label && label}
        </button>
    );
}
