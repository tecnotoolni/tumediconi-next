import DoctorCard from "@/components/public/cards/DoctorCard";
import DoctorPublicHandler from "@/lib/public/doctorHandler";
import { Doctor } from "@/types/Doctor";

export default async function Home() {
  const doctorsResponse = await DoctorPublicHandler.getAll();
  const doctors: Doctor[] = doctorsResponse.data;

  return (
    <>
      <h2>Doctores Asociados</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {
          doctors.map((doctor, index) => (
            <DoctorCard doctor={doctor} key={index} />
          ))
        }
      </ul>
    </>
  );
}
