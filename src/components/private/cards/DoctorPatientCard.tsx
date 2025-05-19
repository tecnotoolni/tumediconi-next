import Avatar from "@/components/common/ui/Avatar";
import { genders } from "@/sources/options";
import routes from "@/sources/routes";
import { Patient, PatientStatus } from "@/types/Patient";
import { convertToReadableDate } from "@/utils/convertToReadableDate";
import Link from "next/link";

interface Props  { 
    patient: Patient 
    href: string
}

export default function DoctorPatientCard({ patient, href } : Props) {

    const statusColor = {
        prospect: "bg-primary-100 text-primary-800",
        active: "bg-green-100 text-green-600",
        disabled: "bg-red-100 text-red-800",
        modified: "bg-green-100 text-green-600",
        deleted: "bg-red-100 text-red-800",
    }

    patient.status = "active"

    return (
        <li>
            <Link href={href} className="relative active:scale-95 transition-all group overflow-hidden cursor-pointer justify-between items-center flex gap-4 border border-cool-gray-50 rounded-lg py-2">
                <span className="absolute group-hover:scale-100 group-hover:opacity-100 opacity-0 transition-all -z-10 top-0 scale-95 rounded-lg left-0 size-full bg-cool-gray-50"></span>
                <div className="px-4">
                    <Avatar className="w-8" url={patient.user?.avatar?.fileUrl ? (routes.api.base + patient.user?.avatar.fileUrl) : ""} />
                </div>
                <div className="flex-1 flex justify-center" >
                    <span>{patient.firstName}</span>
                </div>
                <div className="flex-1 flex justify-center" >
                    <span>{patient.lastName}</span>
                </div>
                <div className="flex-1 flex justify-center" >
                    <span>{convertToReadableDate(patient.birthDate?.toString())}</span>
                </div>
                <div className="w-32 flex justify-center" >
                    <span>{patient.gender ? genders[patient.gender] : ""}</span>
                </div>
                <div className="flex-1 flex justify-center" >
                    <span>{patient.identityCard}</span>
                </div>
                <div className="flex-1 flex justify-center" >
                    <span>{patient.address}</span>
                </div>
                <div className="flex-1 flex justify-center" >
                    <span className={`py-2 px-4 rounded-full ${statusColor[patient.status]}`}>{PatientStatus[patient.status]}</span>
                </div>
                <div className="flex-1 flex justify-center" >
                    <span>{patient.municipality?.name}</span>
                </div>
            </Link>
        </li>
    )
}