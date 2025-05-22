import IconButton from "@/components/common/ui/IconButton";
import SwitchInput from "@/components/common/ui/SwitchInput";
import { Service } from "@/types/Service";
import { TbEdit, TbStar, TbStarFilled, TbTrash } from "react-icons/tb";
import { useState } from "react";

interface Props {
    service: Service;
    handleModify: (service: Service) => void;
    handleDelete: (service: Service) => void;
    handleToggle: (service: Service) => void;
}

export default function ServiceCard({ service, handleDelete, handleModify, handleToggle }: Props) {
    const [checked, setChecked] = useState(service.status === "active" || service.status === "modified");

    const handleSwitch = (newChecked: boolean) => {
        setChecked(newChecked);
        handleToggle(service);
    };

    return (
        <li key={service.id} className="flex flex-col gap-4 bg-white rounded-lg p-4 border border-cool-gray-100">
            <div className="flex flex-col gap-2">
                {
                    service.status === "active" || service.status === "modified" ? (
                        <TbStarFilled className="text-primary-700 text-xl"/> ) :
                    (
                        <TbStar className="text-cool-gray-200 text-xl" />
                    )
                }
                <div>
                    <span className="text-cool-gray-700 font-thin text-sm leading-none">Previsualización</span>
                    <p className="text-2xl font-bold text-primary-800 leading-none font-raleway">{service.name}</p>
                </div>
                <p className="text-cool-gray-700">{service.description}</p>
            </div>
            <span className="text-primary-800 font-medium text-2xl">
                C$ {service.basePrice}
            </span>
            <div className="flex justify-between gap-4">
                <div className="flex gap-2">
                    <IconButton icon={TbEdit} onClick={() => handleModify(service)} />
                    <IconButton icon={TbTrash} onClick={() => handleDelete(service)} />
                </div>
                <SwitchInput
                    checked={checked}
                    onChecked={handleSwitch}
                    name="enabled"
                    slug={`switch-${service.id}`}
                />
            </div>
        </li>
    );
}
