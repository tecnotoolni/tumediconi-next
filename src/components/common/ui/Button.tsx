import { IconType } from 'react-icons';

interface Props {
    color: "red" | "gray" | "blue";
    label: string;
    onClick?: () => void;
    icon?: IconType;
    type: "button" | "submit" | "reset";
}

export default function Button({ color, type, label, onClick, icon: Icon }: Props) {

    const definitions = {
        red: "text-red-200 bg-red-100 hover:bg-red-150",
        blue: "text-primary-800 bg-primary-100 hover:bg-primary-200",
        gray: "text-cool-gray-500 bg-cool-gray-100 hover:bg-stone-200"
    }

    return ( 
        <button type={type} className={`${definitions[color]} p-4 active:scale-95 transition-all flex items-center gap-2 rounded-lg cursor-pointer`} onClick={onClick}>
            {Icon && <Icon className="text-base" />}
            {label}
        </button>
    );
}
