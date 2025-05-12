import Image from "next/image";
import { TbUser } from "react-icons/tb";

interface Props {
    url?: string | null
    name?: string
    className?: string
}

export default function Avatar({ url, name, className } : Props) {
    return (
        <picture className={`bg-cool-gray-700 aspect-square rounded-full flex justify-center items-center overflow-hidden ${className ? className : "size-48"}`}>
            {url ? <Image className="size-full object-cover" src={url} alt={name || "avatar"} width={192} height={192} /> : <TbUser className="text-white size-2/5" />}
        </picture>
    )
}