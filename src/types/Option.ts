import { IconType } from "react-icons";

export default interface Option {
    value: string;
    label: string;
    icon?: IconType
    disabled?: boolean
}