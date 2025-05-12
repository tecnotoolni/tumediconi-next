import { useEffect, useState, useRef } from "react";
import Avatar from "./Avatar";
import Button from "./Button";
import { TbRestore, TbUpload } from "react-icons/tb";
import fileUploadHandler from "@/lib/fileUploadHandler";
import FileData from "@/types/FileData";
import routes from "@/sources/routes";
import toast from "react-hot-toast";
import es from "@/sources/lang.es";
import { getErrorMessage } from "@/utils/getErrorMessage";

interface Props {
    currentAvatarUrl?: string | null;
    className?: string;
}

export default function AvatarUpload({ currentAvatarUrl, className }: Props) {
    const [url, setAvatarURL] = useState<string | null>(currentAvatarUrl ?? null);
    const [fileUploaded, setFileUploaded] = useState<File | null>(null);

    const [fileData, setfileData] = useState<FileData | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const uploadFile = async () => {
            if (!fileUploaded) return;
            try {
                const fileOnBackend = await fileUploadHandler({ file: fileUploaded });
                setAvatarURL(`${routes.api.base}${fileOnBackend.data.fileUrl}`);
                setfileData(fileOnBackend.data);
                toast.success(es.upload.success.image);
            } catch (error) {
                toast.success(getErrorMessage(error));
            }
        };

        uploadFile();
    }, [fileUploaded]);

    const handleReset = () => {
        setAvatarURL(null);
        setfileData(null);
        setFileUploaded(null);
    };

    const handleUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            toast.loading(es.upload.loading.image);
            setFileUploaded(selectedFile);
        }
    };

    return (
        <div className={`flex flex-col items-center gap-2 ${className ?? ""}`}>
            <input type="hidden" name="avatarID" value={fileData?.id ?? ""} />
            <Avatar url={url} />
            <div className="flex gap-2 items-center">
                <Button
                    onClick={handleUpload}
                    color="gray"
                    type="button"
                    label="Subir Imagen"
                    icon={TbUpload}
                />
                <Button
                    disabled={!url}
                    onClick={handleReset}
                    color="red"
                    type="button"
                    label="Reiniciar"
                    icon={TbRestore}
                />
            </div>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
        </div>
    );
}
