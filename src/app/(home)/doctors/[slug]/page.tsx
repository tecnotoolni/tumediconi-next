import DoctorServicesClient from "@/components/public/DoctorServicesClient";
import DoctorPublicHandler from "@/lib/public/doctorHandler";
import routes from "@/sources/routes";
import Image from "next/image";
import { TbCalendar, TbCertificate, TbLanguage, TbMapPin, TbStethoscope } from "react-icons/tb";

interface PageProps {
    params: { slug: string };
}

export default async function DoctorPage({ params }: PageProps) {
    const { slug } = await params;
    const doctor = await DoctorPublicHandler.getBySlug(slug);

    const languages = doctor.data.metadatas
                    .filter(meta => meta.metadata.type === "language")
                    .map(meta => meta.metadata.value)
                    .join(", ")

    const businessHours = doctor.data.metadatas
                    .filter(meta => meta.metadata.type === "business_hours")
                    .map(meta => meta.metadata.value)
                    .join(", ")

    const experienceYears = doctor.data.activeSince
        ? new Date().getFullYear() - new Date(doctor.data.activeSince).getFullYear()
        : 0;



    return (
        <>
        <article className="flex gap-4 w-full">
            <ul className="flex flex-col gap-4 flex-1">
                <li className="flex bg-white rounded-2xl p-4 items-center gap-4">
                    <Image className="size-64 rounded-full object-cover -mt-16" src={routes.api.base + doctor.data.user?.avatar?.fileUrl} width={360} height={360} alt="avatar" /> 
                    <div className="flex flex-col">
                        <h1 className="font-raleway text-3xl font-medium">{doctor.data.firstName} {doctor.data.lastName}</h1>
                        <div className="flex items-center gap-1 text-xl text-primary-600">
                            <TbStethoscope />
                            <span >{doctor.data.specialty.value}</span>
                        </div>
                        <span className="mt-4 text-xl text-primary-700">{experienceYears} años de Experiencia</span>
                    </div>
                </li>
                <li className="p-4 rounded-2xl bg-white">
                    <TbCertificate className="text-primary-500" />
                    <span className="text-primary-600 font-raleway">Perfil Profesional</span>
                    <p className="text-primary-800 ">{doctor.data.notes}</p>
                </li>
            </ul>
            <div className="max-w-64 w-full">
                <ul className="flex flex-col gap-4 h-full *:flex-1">
                    <li className="p-4 rounded-2xl bg-white">
                        <TbMapPin className="text-primary-500" />
                        <span className="text-primary-600 font-raleway">Ubicación</span>
                        <p className="text-primary-800 text-2xl">{doctor.data.location?.municipality?.name}</p>
                    </li>
                    <li className="p-4 rounded-2xl bg-white">
                        <TbLanguage className="text-primary-500" />
                        <span className="text-primary-600 font-raleway">Idiomas</span>
                        <p className="text-primary-800 text-2xl">{languages}</p>
                    </li>
                    <li className="p-4 rounded-2xl bg-white">
                        <TbCalendar className="text-primary-500" />
                        <span className="text-primary-600 font-raleway">Horarios de Atención</span>
                        <p className="text-primary-800 text-2xl">{businessHours}</p>
                    </li>
                </ul>
            </div>
        </article>
        {doctor.data.services && <DoctorServicesClient doctorID={doctor.data.id} services={doctor.data.services} />}
        </>
    );
}
