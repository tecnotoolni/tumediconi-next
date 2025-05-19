"use client";
import Avatar from "@/components/common/ui/Avatar";
import Button from "@/components/common/ui/Button";
import Modal from "@/components/common/ui/Modal";
import ManageCommunicationChannel from "@/components/private/forms/channel/ManageChannel";
import SubpageTitle from "@/components/private/SubpageTitle";
import { getPatientInteractionByDoctor } from "@/lib/interactionHandler";
import routes from "@/sources/routes";
import { UseAuthStore } from "@/store/useAuthStore";
import { ContactChannel } from "@/types/ContactChannel";
import { KeyWithStringValue } from "@/types/KeyWithStringValue";
import { PatientInteraction } from "@/types/Patient";
import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TbBrandFacebook, TbBrandInstagram, TbBrandTelegram, TbBrandTwitter, TbClipboard, TbEdit, TbExternalLink, TbGlobe, TbMail, TbPhone, TbPlus, TbTrash } from "react-icons/tb";

type Props = {
  params: Promise<{ id: string }>;
};

export default function PatientDetailPage({ params }: Props) {
  const { id } = use(params)
  const [isCommunicationOpen, setCommunicationIsOpen] = useState(false);
  const [isInteractionOpen, setInteractionOpen] = useState(false);
  const [interactions, setInteractions] = useState<PatientInteraction | null>(null);
  const { user } = UseAuthStore();
  const [contactChannelValues, setContactChannelValues] = useState<KeyWithStringValue>({

  })

    const handleCreateContactChannel = () => {
    setContactChannelValues({
        patientID: String(interactions?.patient.id) || "",
        createdBy: String(user?.doctor?.id) || "",
    })

    setCommunicationIsOpen(true)
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

    setCommunicationIsOpen(true)
  }

  const fetchCurrentPatient = React.useCallback(async () => {
    if (!user?.doctor) {
      return;
    }
    const interactions = await getPatientInteractionByDoctor(user?.doctor?.id, parseInt(id));
    setInteractions(interactions.data);
  }, [user?.doctor, id]);

  useEffect(() => {
    fetchCurrentPatient();

  }, [fetchCurrentPatient]);

    
  const ListContactChannels = ({ contactChannels = [], children }: { contactChannels?: ContactChannel[], children : React.ReactNode }) => {
    const groupedChannels = contactChannels.reduce<Record<string, ContactChannel[]>>((acc, channel) => {
      if (!acc[channel.type]) {
        acc[channel.type] = [];
      }
      acc[channel.type].push(channel);
      return acc;
    }, {});

    return (
      <ul className="relative gap-4 grid grid-cols-2 p-4 h-full border border-cool-gray-100 rounded-lg font-raleway">
        {children}
        <li>
          <h2>Teléfonos</h2>
          <ul className="mt-2 flex flex-col gap-2">
            {groupedChannels["phone"]?.map((channel, index) => (
              <ContactChannelPhoneItem key={index} contactChannel={channel} />
            ))}
          </ul>
        </li>
        <li>
          <h2>Correos</h2>
          <ul className="mt-2 flex flex-col gap-2">
            {groupedChannels["email"]?.map((channel, index) => (
              <ContactChannelEmailItem key={index} contactChannel={channel} />
            ))}
          </ul>
        </li>
        <li>
          <h2>Redes Sociales</h2>
          <ul className="mt-2 flex gap-2">
            {groupedChannels["social_media"]?.map((channel, index) => (
              <ContactChannelSocialMediaItem key={index} contactChannel={channel} />
            ))}
          </ul>
        </li>
      </ul>
    );
  };

  const ContactChannelPhoneItem = ({contactChannel}: { contactChannel : ContactChannel}) => {
    return (
      <li
        key={contactChannel.id}
        className="flex flex-col gap-1 items-start text-cool-gray-700"
      >
        <div className="flex gap-2 w-full">
          <TbPhone className="size-5" />

          <span className="font-light flex-1 leading-none">{contactChannel.name}</span>
          <div className="flex justify-end items-start">
            <button
              className="flex cursor-pointer items-center justify-center active:scale-95 text-cool-gray-700 hover:text-primary-600 transition-all"
              onClick={() => { handleModifyContactChannel(contactChannel) }}
            >
              <TbEdit className="size-5 text-primary-600" />
            </button>
            <button
              className="flex cursor-pointer items-center justify-center active:scale-95 text-cool-gray-700 hover:text-primary-600 transition-all"
              onClick={() => {
                toast.success("Copiado al portapapeles");
                navigator.clipboard.writeText(contactChannel.value);
              }}
            >
              <TbTrash className="size-5 text-primary-600" />
            </button>
            <a
              href={`mailto:${contactChannel.value}`}
              className="flex items-center justify-center active:scale-95 text-cool-gray-700 hover:text-primary-600 transition-all"
            >
              <TbExternalLink className="size-5 text-primary-600" />
            </a>
          </div>
        </div>
        <span className="text-md break-all font-roboto">{contactChannel.value}</span>
      </li>
    );
  }

  const ContactChannelEmailItem = ({contactChannel}: { contactChannel : ContactChannel}) => {

    return(
      <li
        key={contactChannel.id}
        className="flex flex-col gap-1 items-start text-cool-gray-700"
      >
        <div className="flex gap-2 w-full">
          <TbMail className="size-5" />
          <span className="font-light flex-1 leading-none">{contactChannel.name}</span>
          <div className="flex justify-end items-start">
            <button
              className="flex cursor-pointer items-center justify-center active:scale-95 text-cool-gray-700 hover:text-primary-600 transition-all"
              onClick={() => { handleModifyContactChannel(contactChannel) }}
            >
              <TbEdit className="size-5 text-primary-600" />
            </button>
            <button
              className="flex cursor-pointer items-center justify-center active:scale-95 text-cool-gray-700 hover:text-primary-600 transition-all"
              onClick={() => {
                toast.success("Copiado al portapapeles");
                navigator.clipboard.writeText(contactChannel.value);
              }}
            >
              <TbTrash className="size-5 text-primary-600" />
            </button>
            <a
              href={`mailto:${contactChannel.value}`}
              className="flex items-center justify-center active:scale-95 text-cool-gray-700 hover:text-primary-600 transition-all"
            >
              <TbExternalLink className="size-5 text-primary-600" />
            </a>
          </div>
        </div>
        <span className="text-md break-all font-roboto">{contactChannel.value}</span>
      </li>
    )
  }

  const ContactChannelSocialMediaItem = ({contactChannel}: { contactChannel : ContactChannel}) => {

    const registeredSocialMedia = {
      facebook: TbBrandFacebook,
      instagram: TbBrandInstagram,
      twitterx: TbBrandTwitter,
      telegram: TbBrandTelegram,
    }

    const Icon = registeredSocialMedia[contactChannel.name as keyof typeof registeredSocialMedia] || TbGlobe;

    return(
      <li className="flex gap-1">
        <a href={contactChannel.value} target="_blank" rel="noopener noreferrer" className="text-2xl">
          {Icon && <Icon />}
        </a>
        <button
          className="flex cursor-pointer items-center justify-center active:scale-95 text-cool-gray-700 hover:text-primary-600 transition-all"
          onClick={() => { handleModifyContactChannel(contactChannel) }}
        >
          <TbEdit className="size-5 text-primary-600" />
        </button>
        <button
          className="flex cursor-pointer items-center justify-center active:scale-95 text-cool-gray-700 hover:text-primary-600 transition-all"
          onClick={() => {
            toast.success("Copiado al portapapeles");
            navigator.clipboard.writeText(contactChannel.value)
          }}
        >
          <TbTrash className="size-5 text-primary-600" />
        </button>
        <button
          className="flex cursor-pointer items-center justify-center active:scale-95 text-cool-gray-700 hover:text-primary-600 transition-all"
          onClick={() => {
            toast.success("Copiado al portapapeles");
            navigator.clipboard.writeText(contactChannel.value)
          }}
        >
          <TbClipboard className="size-5 text-primary-600" />
        </button>
      </li>
    )
  }
  
  return (
    <>
      <SubpageTitle title="Interacciones con Pacientes">
          <Button
              onClick={() => setInteractionOpen(true)}
              color="gray"
              label="Agregar Paciente sin Cuenta"
              type="button"
              icon={TbPlus}
          />
      </SubpageTitle>

      <article className="grid grid-cols-2 gap-4 min-h-48">
        <div className="flex gap-2 items-center p-4 h-full border border-cool-gray-100 rounded-lg font-raleway">
          <Avatar className="size-24" url={interactions?.patient.user?.avatar?.fileUrl ? routes.api.base + interactions?.patient.user?.avatar?.fileUrl : ""} />
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-medium">{interactions?.patient.firstName}</h2>
            <p className="text-xl font-medium">{interactions?.patient.lastName}</p>
            <span className="font-roboto font-light">{interactions?.patient.identityCard}</span>
          </div>
        </div>
        <ListContactChannels contactChannels={interactions?.patient.contactChannels}>
          <Button onClick={()=> {handleCreateContactChannel()}} color="blue" icon={TbPlus} type="button" className="absolute right-1 bottom-1 !text-sm !p-2" />
        </ListContactChannels>
      </article>

      <Modal
        title="Agregar Canal de Comunicación"
        open={isCommunicationOpen}
        onClose={() => setCommunicationIsOpen(false)}
      >
        <ManageCommunicationChannel
          onClose={() => setCommunicationIsOpen(false)}
          reload={fetchCurrentPatient}
          values={contactChannelValues}
        />
      </Modal>

      <Modal
        title="Agregar Interacción"
        open={isInteractionOpen}
        onClose={() => setInteractionOpen(false)}
      >
        <>
        </>
      </Modal>

    </>
  );
}
