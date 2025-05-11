import Image from "next/image";

interface Props {
    name: string;
    hideLogo?: boolean;
    className?: string;
}

export default function SiteIdentifierTitle({ name, hideLogo, className } : Props) {
    return(
    <div className={`text-shades-200 ${className}`}>
        {!hideLogo && <Image className="mb-4" width={64} height={64} src="/logos/gray.png" alt="logo" />}
        <span className="font-light leading-none">Administración</span>
        <h1 className="text-2xl leading-tight font-medium">{name}</h1>
      </div>
    )
}