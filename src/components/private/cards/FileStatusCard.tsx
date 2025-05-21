import FileIcon from "@/components/common/ui/FileIcon";
import { TbCheck, TbCircleDashed, TbX } from "react-icons/tb";


interface Props {
    upload: {
        id: number;
        file: File;
        status: "uploading" | "success" | "error";
    }
}

export default function FileStatusCard({upload} : Props) {
    const formatFileSize = (size: number) => `${(size / 1024).toFixed(1)} KB`;
    
    return(
        <li key={upload.id} className="p-2 flex gap-2 items-center">
            <div className="flex justify-center items-center h-full p-2 w-auto aspect-square text-2xl rounded-lg text-primary-800 bg-white">
                <FileIcon fileName={upload.file.name} />
            </div>
            <div className="flex flex-col flex-1">
                <span className="text-primary-800">{upload.file.name}</span>
                <span className="text-sm text-cool-gray-500">{formatFileSize(upload.file.size || 0)}</span>
            </div>
            <div className="flex gap-2">
              {upload.status === "uploading" && <TbCircleDashed className="animate-spin text-primary-500 text-xl" />}
              {upload.status === "success" && <TbCheck className="text-green-500 text-xl" />}
              {upload.status === "error" && <TbX className="text-red-500 text-xl" />}
            </div>
        </li>
    )
}