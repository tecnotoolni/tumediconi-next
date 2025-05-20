"use client";
import SubpageTitle from "@/components/private/SubpageTitle";
import Button from "@/components/common/ui/Button";
import { TbPlus } from "react-icons/tb";
import Modal from "@/components/common/ui/Modal";
import React, { useEffect, useState } from "react";
import ManagePatientProspect from "@/components/private/forms/patient/ManagePatientProspect";
import { KeyWithStringValue } from "@/types/KeyWithStringValue";
import { UseAuthStore } from "@/store/useAuthStore";
import { getPatientsByDoctorAsignment } from "@/lib/patientHandler";
import { Patient } from "@/types/Patient";
import DoctorPatientCard from "@/components/private/cards/DoctorPatientCard";
import routes from "@/sources/routes";
import { Actions } from "@/types/UI";
import DeletePatientProspect from "@/components/private/forms/patient/DeletePatientProspect";

export default function DashboardInteractions() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = UseAuthStore();
    const [patients, setPatients] = useState<Patient[]>([]);
    const [patientAction, setPatientAction] = useState<Actions>(Actions.create);
    const [patientsValues, setPatientsValues] = useState<KeyWithStringValue>({})

    const handleCreate = () => {
        setPatientAction(Actions.create);
        setPatientsValues({})
        setIsOpen(true);
    }

    const handleEdit = (patient: Patient) => {
        console.log(patient)
        setPatientAction(Actions.update);
        setPatientsValues({
            id: String(patient.id),
            firstName: patient.firstName,
            lastName: patient.lastName,
            birthDate: patient.birthDate ? String(patient.birthDate).split("T")[0] : "",
            address: patient.address || "",
            identityCard: patient.identityCard,
            gender: patient.gender || "",
            municipalityID: String(patient.municipalityID) || "",
            status: patient.status,
            doctorID: String(user?.doctor?.id),
        })
        setIsOpen(true);
    }

    const handleDelete = (patient: Patient) => {
        setPatientAction(Actions.delete);
        setPatientsValues({
            id: String(patient.id),
        })
        setIsOpen(true);
    }

    const patientActionTitle = {
        [Actions.create]: "Agregar Paciente Prospecto",
        [Actions.update]: "Modificar Paciente Prospecto",
        [Actions.delete]: "Eliminar Paciente Prospecto",
    }

    const fetchPatients = React.useCallback(async () => {
        if (!user || !user.doctor?.id) return;
        const patients = await getPatientsByDoctorAsignment(user.doctor.id);
        setPatients(patients.data);
    },[user])

    useEffect(() => {
        fetchPatients()
    },[fetchPatients])

    return (
      <>
        <SubpageTitle title="Pacientes">
          <Button
            onClick={handleCreate}
            color="gray"
            label="Agregar Paciente Prospecto"
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
            <span className="w-12"></span>
          </div>
          <ul className="flex flex-col gap-2">
            {patients.map((patient, index) => (
              <DoctorPatientCard
                onDelete={() => {
                  handleDelete(patient);
                }}
                onEdit={() => {
                  handleEdit(patient);
                }}
                href={routes.dashboard + "/patients/" + patient.id}
                patient={patient}
                key={index}
              />
            ))}
          </ul>
        </article>

        <Modal
          title={patientActionTitle[patientAction]}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          {patientAction != Actions.delete ? (
            <ManagePatientProspect
              onClose={() => {
                setIsOpen(false);
              }}
              reload={fetchPatients}
              values={patientsValues}
            />
          ) : (
            <DeletePatientProspect
              onClose={() => {
                setIsOpen(false);
              }}
              reload={fetchPatients}
              values={patientsValues}
            />
          )}
        </Modal>
      </>
    );
}
