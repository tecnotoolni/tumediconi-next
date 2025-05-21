import FileIcon from "@/components/common/ui/FileIcon";
import IconButton from "@/components/common/ui/IconButton";
import FileData from "@/types/FileData";
import { TbTrash } from "react-icons/tb";


interface Props {
    upload: FileData
    onDelete?: () => void;
}

export default function FileCard({upload, onDelete} : Props) {
    const formatFileSize = (size: number) => `${(size / 1024).toFixed(1)} KB`;

    return(
        <li key={upload.id} className="p-2 flex gap-2 items-center">
            <div className="flex justify-center items-center h-full p-2 w-auto aspect-square text-2xl rounded-lg text-primary-800 bg-white">
                <FileIcon fileName={upload.name} />
            </div>
            <div className="flex flex-col flex-1">
                <span className="text-primary-800">{upload.name}</span>
                <span className="text-sm text-cool-gray-500">{formatFileSize(upload.size || 0)}</span>
            </div>
            <div>
                <IconButton onClick={onDelete} type="button" icon={TbTrash} />
            </div>
        </li>
    )
}