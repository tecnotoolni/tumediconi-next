"use client";
import SubpageTitle from "@/components/private/SubpageTitle";
import Button from "@/components/common/ui/Button";
import { TbPlus } from "react-icons/tb";
import Modal from "@/components/common/ui/Modal";
import { useEffect, useState } from "react";
import CreatePatientProspect from "@/components/private/forms/patient/CreatePatientProspect";
import { KeyWithStringValue } from "@/types/KeyWithStringValue";
import LoadingSpinner from "@/components/common/ui/LoadingSpinner";
import { UseAuthStore } from "@/store/useAuthStore";
import { getPatientsByDoctorAsignment } from "@/lib/patientHandler";
import { Patient } from "@/types/Patient";
import DoctorPatientCard from "@/components/private/cards/DoctorPatientCard";
import routes from "@/sources/routes";

export default function DashboardInteractions() {
    const [isOpen, setIsOpen] = useState(false);
    const [data] = useState<{ [key: string]: string }>({});
    const [errors] = useState<KeyWithStringValue | undefined>({});
    const [status, setStatus] = useState<"loading" | "onhold" | "success">("loading");
    const { user } = UseAuthStore();
    const [patients, setPatients] = useState<Patient[]>([]);

    const setLoading = (isLoading: boolean) => {
        setStatus(isLoading ? "loading" : "onhold");
    }

    useEffect(() => {
        const fetchPatients = async () => {
            if (!user || !user.doctor?.id) return;
            const patients = await getPatientsByDoctorAsignment(user.doctor.id);
            setPatients(patients.data);
        }
        fetchPatients()
    },[user])

    useEffect(() => {
        console.log("Data changed:", data);
    }, [data]);

    return (
        <>
        <SubpageTitle title="Pacientes">
            <Button
                onClick={() => setIsOpen(true)}
                color="gray"
                label="Agregar Paciente sin Cuenta"
                type="button"
                icon={TbPlus}
            />
        </SubpageTitle>

        <article className="flex flex-col gap-4">
            <div className="py-2 rounded-full flex gap-4 text-center text-cool-gray-300 bg-cool-gray-50">
                <span className="w-16"></span>
                <span className="flex-1">Nombres</span>
                <span className="flex-1">Apellidos</span>
                <span className="flex-1">Cumpleaños</span>
                <span className="flex-1">Sexo</span>
                <span className="flex-1">Cédula</span>
                <span className="flex-1">Dirección</span>
                <span className="flex-1">Estado</span>
                <span className="flex-1">Municipio</span>
            </div>
            <ul className="flex flex-col gap-2">
                {
                    patients.map((patient, index) => (
                        <DoctorPatientCard href={ routes.dashboard + "/patients/" + patient.id} patient={patient} key={index} />
                    ))
                }
            </ul>
        </article>
        
        <Modal
            title="Paciente sin Registro"
            open={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <form className="flex flex-col gap-6 p-4">
                {status == "loading" && <LoadingSpinner className="absolute top-0 left-0 bg-white/50 backdrop-blur-lg" />}
                <CreatePatientProspect errors={errors} onLoadingChange={setLoading} />
                <Button color="blue" label="Finalizar Registro" type="submit" className="w-full justify-center" />
            </form>
        </Modal>
        </>
    );
}
