import { IconType } from "react-icons";

interface Props {
    title: string;
    icon: IconType;
    action: "new" | "edit" | "delete";
    children?: React.ReactNode;
    className?: string;
}

export default function ModalHeader({ title, icon : Icon, children, className} : Props) {
    return (
        <header className={`flex gap-4 justify-between border-b border-cool-gray-100  px-4 py-2 rounded-xl text-cool-gray-700 ${className}`}>
            <div className="flex gap-2 items-center">
                <Icon />
                <span className="font-semibold font-raleway">{title}</span>
            </div>
            {children}
        </header>
    )
}