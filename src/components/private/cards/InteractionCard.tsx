"use client"
import IconButton from "@/components/common/ui/IconButton";
import { Interaction } from "@/types/Interaction";
import { convertToReadableDate } from "@/utils/convertToReadableDate";
import { useState } from "react";
import { TbBox, TbCalendar, TbEdit, TbMail, TbMessage, TbPhone, TbPrescription, TbRepeat, TbTestPipe, TbTrash } from "react-icons/tb";
import FileReadOnlyCard from "./FileReadOnlyCard";

interface Props {
    interaction: Interaction;
    handleEdit: () => void;
    handleDelete: () => void;
}

const action = {
    automated: {
        name: "Automatizado",
        className: "text-green-600 bg-green-100",
    },
    manual: {
        name: "Manualmente",
        className: "text-primary-800 bg-primary-100",
    }
}

const types = {
    call: {
        name: "Llamada",
        icon: TbPhone,
    },
    email: {
        name: "Email",
        icon: TbMail,
    },
    meeting: {
        name: "SMS",
        icon: TbMessage,
    },
    follow_up: {
        name: "Seguimiento",
        icon: TbRepeat,
    },
    prescription: {
        name: "Receta",
        icon: TbPrescription,
    },
    lab_result: {
        name: "Resultados de laboratorio",
        icon: TbTestPipe,
    },
    other: {
        name: "Otro",
        icon: TbBox,
    }
}

export default function InteractionCard({ interaction, handleEdit, handleDelete }: Props) {
    const [open, setOpen] = useState(false);
    const TypeIcon = types[interaction.interactionType].icon;

    return(
        <li className="list-none">
            <div className="flex gap-4 items-center">
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className={`group cursor-pointer active:scale-95 ${open ? "bg-cool-gray-50" : ""} transition-all relative flex gap-4 border border-cool-gray-100 rounded-lg text text-cool-gray-700 w-full p-4 items-center`}
                >
                    <span className="absolute group-hover:scale-100 group-hover:opacity-100 opacity-0 transition-all -z-10 top-0 scale-95 rounded-lg left-0 size-full bg-cool-gray-50"></span>
                    <div className="flex gap-1 flex-1 items-center">
                        <TbCalendar /> 
                        <span>{convertToReadableDate(String(interaction.interactionDate))}</span>
                    </div>
                    <span className="flex-1">
                        {interaction.name}
                    </span>
                    <div className="flex gap-1 flex-1 items-center justify-center text-primary-600">
                        <TypeIcon />
                        <span>{types[interaction.interactionType].name}</span>
                    </div>
                    <div className="flex-1">
                        <span className={`px-4 py-2 rounded-full ${action[interaction.creationAction].className}`}>
                            {action[interaction.creationAction].name}
                        </span>
                    </div>
                    <span className="flex-1">
                        {interaction.patientInteractionFile?.length || 0}
                    </span>
                </button>
                <div className="flex gap-2">
                    <IconButton icon={TbEdit} onClick={handleEdit} />
                    <IconButton icon={TbTrash} onClick={handleDelete} />
                </div>
            </div>
            <div className={`flex flex-col bg-cool-gray-50 rounded-lg p-4 gap-4 ${open ? "max-h-96 mt-2" : "max-h-0 !p-0 mt-0"} overflow-hidden transition-all duration-300`}>
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-raleway text-cool-gray-700">Notas de la Interacción</h3>
                    <div className="bg-white p-4 w-full rounded-lg">
                        <div dangerouslySetInnerHTML={{ __html: interaction.notes }} className="prose max-w-none     text-cool-gray-700 font-roboto" />
                    </div>
                </div>
                {(interaction.patientInteractionFile?.length ?? 0) > 0 && <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-raleway text-cool-gray-700">Archivos Adjuntos</h3>
                    <ul className="flex gap-2 flex-wrap">
                        {
                            interaction.patientInteractionFile?.map((attachment) => (
                                <FileReadOnlyCard key={attachment.id} file={attachment.file} />
                            ))
                        }
                    </ul>
                </div>}
            </div>
        </li>
    )
}
