import { useEffect, useRef, useState } from "react";
import { TbCloudUp } from "react-icons/tb";
import FileData from "@/types/FileData";
import fileUploadHandler from "@/lib/private/fileUploadHandler";
import FileCard from "@/components/private/cards/FileCard";
import FileStatusCard from "@/components/private/cards/FileStatusCard";

interface UploadFile {
  id: number;
  file: File;
  status: "uploading" | "success" | "error";
}

interface Props {
    isPrivate?: boolean;
    name: string;
    attachments?: FileData[];
}

export default function MultipleFileUpload({isPrivate, name, attachments} : Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadQueue, setUploadQueue] = useState<UploadFile[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FileData[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setUploadedFiles(attachments || [])
  }, [attachments]);

  useEffect(() => {
    console.log(uploadQueue);
  }, [uploadQueue]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    queueFilesForUpload(e.target.files);
  };

  const handleFileRemove = (file: FileData) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== file.id));
  }

  const handleButtonClick = () => fileInputRef.current?.click();

  // Drag & Drop
  const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      queueFilesForUpload(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Agrega archivos y los sube
  const queueFilesForUpload = (fileList: FileList) => {
    const newUploads: UploadFile[] = Array.from(fileList).map((file, index) => ({
      id: Date.now() + index,
      file,
      status: "uploading",
    }));

    setUploadQueue((prev) => [...prev, ...newUploads]);

    newUploads.forEach(async (uploadFile) => {
      try {
        const response = await fileUploadHandler({ file: uploadFile.file, isPrivate });

        setUploadedFiles((prev) => [...prev, response.data]);

        setUploadQueue((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id
              ? { ...f, status: response.status === 200 ? "success" : "error" }
              : f
          )
        );
      } catch (error) {
        console.error("Error uploading file:", error);
        setUploadQueue((prev) =>
          prev.map((f) => (f.id === uploadFile.id ? { ...f, status: "error" } : f))
        );
      }
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
      />

        {uploadedFiles.map((f, i) => (
        <input key={i} type="hidden" name={name} value={f.id} />
        ))}

      <button
        type="button"
        onClick={handleButtonClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`flex flex-col justify-center items-center h-48 p-4 border-dashed transition-all border-2 rounded-lg cursor-pointer ${
          isDragging
            ? "bg-primary-100 border-primary-400 text-primary-800"
            : "bg-cool-gray-50 border-cool-gray-200 text-primary-700 hover:bg-primary-100 hover:border-primary-300"
        }`}
      >
        <TbCloudUp className="text-5xl" />
        <span>{isDragging ? "¡Suelta los archivos aquí!" : "Arrastra y suelta archivos acá o escoge uno."}</span>
      </button>

      {uploadQueue.some((f) => f.status !== "success") && (
        <div className="flex flex-col gap-1">
            <h3 className="font-raleway text-xl">Archivos en Cola</h3>
            <ul className="p-2 flex flex-col bg-cool-gray-50 rounded-lg">
                {uploadQueue
                    .filter((f) => f.status !== "success")
                    .map((upload) => (
                <FileStatusCard key={upload.id} upload={upload} />
                ))}
            </ul>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <ul className="p-2 flex flex-col bg-cool-gray-50 rounded-lg">
          {uploadedFiles.map((file, index) => (
            <FileCard onDelete={() => handleFileRemove(file)} key={index} upload={file} />
          ))}
        </ul>
      )}
    </div>
  );
}
