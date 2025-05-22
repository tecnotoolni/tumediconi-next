"use client";
import Avatar from "@/components/common/ui/Avatar";
import Button from "@/components/common/ui/Button";
import Modal from "@/components/common/ui/Modal";
import InteractionCard from "@/components/private/cards/InteractionCard";
import DeleteCommunicationChannel from "@/components/private/forms/channel/DeleteChannel";
import ManageCommunicationChannel from "@/components/private/forms/channel/ManageChannel";
import DeleteInteraction from "@/components/private/forms/interaction/DeleteInteraction";
import ManageInteraction from "@/components/private/forms/interaction/ManageInteraction";
import ContactChannelItem from "@/components/private/items/ContactChannelItem";
import SubpageTitle from "@/components/private/SubpageTitle";
import { getPatientInteractionByDoctor } from "@/lib/interactionHandler";
import routes from "@/sources/routes";
import { UseAuthStore } from "@/store/useAuthStore";
import { ContactChannel } from "@/types/ContactChannel";
import FileData from "@/types/FileData";
import { Interaction } from "@/types/Interaction";
import { KeyWithStringValue } from "@/types/KeyWithStringValue";
import { PatientInteraction } from "@/types/Patient";
import { Actions } from "@/types/UI";
import { formatDateToISO } from "@/utils/convertToReadableDate";
import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TbPlus, TbSpeakerphone } from "react-icons/tb";

type Props = {
  params: Promise<{ id: string }>;
};

export default function PatientDetailPage({ params }: Props) {
  const { id } = use(params)
  
  const [isCommunicationOpen, setCommunicationIsOpen] = useState(false);
  const [contactChannelValues, setContactChannelValues] = useState<KeyWithStringValue>({})
  const [contactChannelAction, setContactChannelAction] = useState<Actions>(Actions.create);

  const [isInteractionOpen, setInteractionOpen] = useState(false);
  const [interactionValues, setInteractionValues] = useState<KeyWithStringValue>({});
  const [interactionAction, setInteractionAction] = useState<Actions>(Actions.create);
  const [interactionAttachments, setInteractionAttachments] = useState<FileData[] | undefined>([]);

  const [interactions, setInteractions] = useState<PatientInteraction | null>(null);
  const { user } = UseAuthStore();


  const interactionTitle = {
    [Actions.create]: "Agregar Interacción",
    [Actions.update]: "Modificar Interacción",
    [Actions.delete]: "Eliminar Interacción",
  }

  const contactChannelTitle = {
    [Actions.create]: "Agregar Canal de Comunicación",
    [Actions.update]: "Modificar Canal de Comunicación",
    [Actions.delete]: "Eliminar Canal de Comunicación",
  }

  const handleModifyInteraction = (interaction : Interaction) => {
    setInteractionValues({
      id: String(interaction.id),
      notes: interaction.notes,
      name: interaction.name,
      patientID: String(interaction.patientID),
      doctorID: String(interaction.doctorID),
      interaction_type: interaction.interactionType,
      interaction_date: interaction.interactionDate ? formatDateToISO(String(interaction.interactionDate)) : "",
    })


    const attachments = interaction.interactionAttachments.map((attachment) => attachment.file).filter((file): file is FileData => file !== undefined)

    setInteractionAttachments(attachments)
    setInteractionAction(Actions.update)
    setInteractionOpen(true)
  }

  const handleDeleteInteraction = (interaction : Interaction) => {
    setInteractionValues({
      id: String(interaction.id),
    })

    setInteractionAction(Actions.delete)
    setInteractionOpen(true)
  }


  const handleDeleteContactChannel = (contactChannel : ContactChannel) => {
    setContactChannelValues({
      id: String(contactChannel.id),
      name: contactChannel.name,
      notes: contactChannel.notes,
      patientID: String(contactChannel.patientID),
      type: contactChannel.type,
      value: contactChannel.value
    })
    setContactChannelAction(Actions.delete)
    setCommunicationIsOpen(true)
  }

  const handleCreateContactChannel = () => {
    setContactChannelValues({
        patientID: String(interactions?.patient.id) || "",
        createdBy: String(user?.doctor?.id) || "",
    })
    
    setContactChannelAction(Actions.create)
    setCommunicationIsOpen(true)
  }

  const handleCreateInteraction = () => {
    
    setInteractionValues({
      patientID: String(interactions?.patient.id) || "",
      doctorID: String(user?.doctor?.id) || "",
    })

    setInteractionAction(Actions.create)
    setInteractionAttachments([])
    setInteractionOpen(true)
  }

  const handleCopyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success("Copiado al portapapeles");
  }

  const handleModifyContactChannel = (contactChannel : ContactChannel) => {
    setContactChannelValues({
      id: String(contactChannel.id),
      name: contactChannel.name,
      notes: contactChannel.notes,
      patientID: String(contactChannel.patientID),
      type: contactChannel.type,
      value: contactChannel.value
    })

    setContactChannelAction(Actions.update)
    setCommunicationIsOpen(true)
  }

  const fetchCurrentPatient = React.useCallback(async () => {
    if (!user?.doctor) {
      return;
    }
    const interactions = await getPatientInteractionByDoctor(user?.doctor?.id, parseInt(id));
    console.log(interactions);
    setInteractions(interactions.data);
  }, [user?.doctor, id]);

  useEffect(() => {
    fetchCurrentPatient();

  }, [fetchCurrentPatient]);

const ListContactChannels = ({
  contactChannels = [],
  children,
}: {
  contactChannels?: ContactChannel[];
  children: React.ReactNode;
}) => {
  const types = [
    { key: "phone", label: "Teléfonos" },
    { key: "email", label: "Correos" },
    { key: "social_media", label: "Redes Sociales" },
  ];

  return (
    <ul className="relative gap-4 grid grid-cols-2 p-4 h-full border border-cool-gray-100 rounded-lg font-raleway">
      {children}
      {types.map(({ key, label }) => (
        <li key={key} className={key === "social_media" ? "col-span-2" : ""}>
          <h2>{label}</h2>
          <ul className={`mt-2 ${key === "social_media" ? "flex gap-2 flex-wrap" : "flex flex-col gap-2"}`}>
            {contactChannels
              .filter((channel) => channel.type === key)
              .map((channel) => (
                <ContactChannelItem handleCopyToClipboard={handleCopyToClipboard} handleModifyContactChannel={handleModifyContactChannel} handleDeleteContactChannel={handleDeleteContactChannel} key={channel.id} contactChannel={channel} />
              ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
  
  return (
    <>
      <SubpageTitle title="Interacciones con Pacientes">
        <Button
          onClick={handleCreateInteraction}
          color="gray"
          label="Agregar Interacción"
          type="button"
          icon={TbPlus}
        />
      </SubpageTitle>

      <article className="grid grid-cols-2 gap-4 min-h-48">
        <div className="flex gap-2 items-center p-4 h-full border border-cool-gray-100 rounded-lg font-raleway">
          <Avatar
            className="size-24"
            url={
              interactions?.patient.user?.avatar?.fileUrl
                ? routes.api.base + interactions?.patient.user?.avatar?.fileUrl
                : ""
            }
          />
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-medium">
              {interactions?.patient.firstName}
            </h2>
            <p className="text-xl font-medium">
              {interactions?.patient.lastName}
            </p>
            <span className="font-roboto font-light">
              {interactions?.patient.identityCard}
            </span>
          </div>
        </div>
        <ListContactChannels
          contactChannels={interactions?.patient.contactChannels}
        >
          <Button
            onClick={handleCreateContactChannel}
            color="blue"
            icon={TbPlus}
            type="button"
            className="absolute right-1 top-1 !text-sm !p-2"
          />
        </ListContactChannels>
      </article>

      <article className="flex flex-col gap-4">
        <h2 className="text-xl font-medium text-cool-gray-700">Historial de Interacciones</h2>
        <div className="p-2 rounded-full flex gap-4 text-center items-center text-cool-gray-300 bg-cool-gray-50">
          <span className="flex-1">Fecha de Interacción</span>
          <span className="flex-1">Nombre de Interacción</span>
          <span className="flex-1">Tipo de Interacción</span>
          <span className="flex-1">Creado</span>
          <span className="flex-1">Archivos Adjuntos</span>
          <span className="w-12"></span>
        </div>
        {
          interactions?.interactions.map((interaction, index) => (
            <InteractionCard interaction={interaction} key={index} handleDeleteInteraction={handleDeleteInteraction} handleModifyInteraction={handleModifyInteraction} />
          ))
        }
      </article>

      <Modal
        title={
          contactChannelTitle[
            contactChannelAction as keyof typeof contactChannelTitle
          ]
        }
        open={isCommunicationOpen}
        onClose={() => setCommunicationIsOpen(false)}
        icon={TbSpeakerphone}
      >
        {contactChannelAction != Actions.delete ? (
          <ManageCommunicationChannel
            onClose={() => setCommunicationIsOpen(false)}
            reload={fetchCurrentPatient}
            values={contactChannelValues}
          />
        ) : (
          <DeleteCommunicationChannel
            onClose={() => setCommunicationIsOpen(false)}
            reload={fetchCurrentPatient}
            values={contactChannelValues}
          />
        )}
      </Modal>

      <Modal
        title={interactionTitle[interactionAction as keyof typeof interactionTitle]}
        open={isInteractionOpen}
        onClose={() => setInteractionOpen(false)}
      >
        {
          interactionAction != Actions.delete ? (
            <ManageInteraction
              onClose={() => setInteractionOpen(false)}
              reload={fetchCurrentPatient}
              values={interactionValues}
              attachments={interactionAttachments}
            />
          ) : (
            <DeleteInteraction
              onClose={() => setInteractionOpen(false)}
              reload={fetchCurrentPatient}
              values={interactionValues}
            />
          )
        }
      </Modal>
    </>
  );
}
