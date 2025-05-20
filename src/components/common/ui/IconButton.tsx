import { IconType } from "react-icons";

interface Props {
    type?: "button" | "link"
    href?: string
    onClick?: () => void;
    icon: IconType
}

export default function IconButton({ type = "button", href, onClick, icon: Icon }: Props) {
    return (
        type === "link" ? (
            <a
                className="flex cursor-pointer items-center justify-center active:scale-95 text-cool-gray-700 hover:text-primary-600 transition-all"
                href={href}
                target="_blank"
            >
                <Icon className="size-5 text-primary-600" />
            </a>
        ) : (
            <button
                className="flex cursor-pointer items-center justify-center active:scale-95 text-cool-gray-700 hover:text-primary-600 transition-all"
                onClick={onClick}
            >
                <Icon className="size-5 text-primary-600" />
            </button>
        )
    );
}