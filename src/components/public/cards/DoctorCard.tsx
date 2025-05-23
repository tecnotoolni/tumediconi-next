    import routes from "@/sources/routes";
import { Doctor } from "@/types/Doctor";
import Image from "next/image";
import Link from "next/link";
import { TbLanguage, TbMapPin } from "react-icons/tb";

interface Props {
    doctor: Doctor
}

export default function DoctorCard({ doctor }: Props) {

    const languages = doctor.metadatas
                    .filter(meta => meta.metadata.type === "language")
                    .map(meta => meta.metadata.value)
                    .join(", ")
                    

    return(
        <li className="relative group rounded-3xl bg-white overflow-hidden active:scale-95 transition-all shadow-md shadow-[#d3eefc] hover:shadow-lg">
            <span className="absolute group-hover:scale-100 scale-50 transition-all group-hover:bg-primary-100 opacity-10 left-0 top-0 size-full"></span>
            <Link className="relative flex flex-col gap-4 p-4" href={`/doctors/${doctor.slug}`}>
                <Image className="w-full aspect-square object-cover rounded-xl" src={routes.api.base + doctor.user?.avatar?.fileUrl} alt="avatar" width={320} height={320} /> 
                <div className="flex items-center flex-col gap-2">
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-raleway font-medium">{doctor.firstName} {doctor.lastName}</h2>
                        <p className="text-primary-600 mb-2">{doctor.specialty.value}</p>
                        <span className="w-16 h-1 rounded-full bg-primary-500"></span>
                    </div>

                    <div className="flex gap-1 items-center">
                        <TbMapPin  />
                        <span>{doctor.location?.municipality?.name}</span>
                    </div>                    
                    
                    <ul className="flex flex-col gap-4 mt-4">
                        <li className="flex gap-1 items-center">
                            <TbLanguage/>
                            <span>{languages}</span>
                        </li>
                    </ul>
                </div>                
            </Link>
        </li>
    )

}