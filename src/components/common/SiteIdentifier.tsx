import Image from "next/image";

interface Props {
    name: string;
    hideLogo?: boolean;
    className?: string;
}

export default function SiteIdentifierTitle({ name, hideLogo, className } : Props) {
    return(
    <div className={`flex justify-center items-center flex-col text-shades-200 text-primary-800 text-center mb-4 ${className}`}>
        {!hideLogo && <Image className="mb-4" width={64} height={64} src="/logos/dark_icon.svg" alt="logo" />}
        <span className="font-light leading-none">Tu Médico Nicaragua</span>
        <h1 className="text-[32px] leading-tight font-medium">{name}</h1>
      </div>
    )
}