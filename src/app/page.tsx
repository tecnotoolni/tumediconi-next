"use client";
import DoctorPublicHandler from "@/lib/public/doctorHandler";
import routes from "@/sources/routes";
import { Doctor } from "@/types/Doctor";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbLanguage } from "react-icons/tb";

export default function Home() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    async function fetchDoctors() {
      const doctors = await DoctorPublicHandler.getAll();
      setDoctors(doctors.data);

      console.log(doctors.data);

    }
    fetchDoctors();
  }, []);

  return (
    <main className="h-full flex flex-col max-w-[1536px] mx-auto p-4 w-full">
      <section>
        <h2>Doctores Asociados</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {
            doctors.map((doctor, index) => (
              <li key={index}>
                <Link className="relative group flex flex-col gap-4 p-4 rounded-2xl overflow-hidden" href={`/doctors/${doctor.slug}`}>
                <span className="absolute group-hover:scale-100 scale-50 transition-all group-hover:bg-cool-gray-50 -z-10 left-0 top-0 size-full"></span>
                <Image className="w-full aspect-square object-cover rounded-2xl" src={routes.api.base + doctor.user?.avatar?.fileUrl} alt="avatar" width={320} height={320} /> 
                <div>
                  <h2 className="text-xl font-raleway font-medium">{doctor.firstName} {doctor.lastName}</h2>
                  <p className="text-primary-600">{doctor.specialty.value}</p>

                  <ul className="flex flex-col gap-4 mt-4">
                    <li className="flex gap-1 items-center">
                      <TbLanguage className="text-xl" />
                      <span>{doctor.metadatas
                        .filter(meta => meta.metadata.type === "language")
                        .map(meta => meta.metadata.value)
                        .join(", ")
                      }</span>
                    </li>
                  </ul>
                </div>                
                </Link>
              </li>
            ))
          }
        </ul>
      </section>
    </main>
  );
}
