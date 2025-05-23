import { StatusForm } from "@/types/UI";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
    status: StatusForm
}

export default function LoadingOverlay({ status } : Props) {
    return (
      <LoadingSpinner className={`absolute top-0 left-0 before:size-full transition-all before:absolute before:bg-white/85 ${ status == StatusForm.loading ? "opacity-100" : "opacity-0 pointer-events-none" }`}/>
    )
}