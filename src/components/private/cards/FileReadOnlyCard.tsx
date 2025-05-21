import FileIcon from "@/components/common/ui/FileIcon";
import IconButton from "@/components/common/ui/IconButton";
import routes from "@/sources/routes";
import FileData from "@/types/FileData";
import toast from "react-hot-toast";
import { TbDownload, TbExternalLink, TbLink } from "react-icons/tb";

interface Props {
    file?: FileData;
}

export default function FileReadOnlyCard({ file } : Props) {
    
    if (!file) return null;


    const handleDownload = () => {
        const url = window.location.origin + routes.api.base + file.fileUrl;
        const link = document.createElement("a");
        link.href = url;
        link.download = file.name ?? "downloaded-file";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(window.location.origin + routes.api.base + file.fileUrl || "")
        toast.success("Enlace copiado al portapapeles")
    }


    return (
        <div className="bg-white p-2 flex gap-4 rounded-lg border border-cool-gray-100 items-center">
            <div className="flex gap-1 items-center">
                <FileIcon className="text-lg" fileName={file.name} />
                <span>{file.name}</span>
            </div>
            <div className="flex gap-2">
                <IconButton onClick={handleCopyToClipboard} icon={TbLink} />
                <IconButton type="link" href={routes.api.base +  file.fileUrl} icon={TbExternalLink} />
                <IconButton onClick={handleDownload} icon={TbDownload} />
            </div>
        </div>
    )
}