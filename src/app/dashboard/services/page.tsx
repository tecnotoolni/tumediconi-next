import SubpageTitle from "@/components/private/SubpageTitle";
import Button from "@/components/common/ui/Button";
import { TbPlus } from "react-icons/tb";

export default function DashboardServices() {
    return(
        <>
            <SubpageTitle title="Servicios">
                <Button color="gray" label="Agregar Servicio"  type="button" icon={TbPlus}/>
            </SubpageTitle>
        </>
    )
}