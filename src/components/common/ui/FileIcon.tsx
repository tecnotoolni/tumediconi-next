import { TbFile, TbFileText, TbFileTypeDoc, TbFileTypeDocx, TbFileTypeJpg, TbFileTypePdf, TbFileTypePng, TbFileTypeXls } from "react-icons/tb";

interface Props {
    type?: string | null,
    fileName?: string | null,
    className?: string
}

export default function FileIcon({ fileName, className, type }: Props) {

    const extension = type?.split("/").pop()?.toLocaleLowerCase() || fileName?.split(".").pop()?.toLowerCase(); 

    console.log("FileIcon", { fileName, type, extension });

    const files = {
        pdf: {
            icon: TbFileTypePdf
        },
        docx: {
            icon: TbFileTypeDocx
        },
        doc: {
            icon: TbFileTypeDoc
        },
        xlsx: {
            icon: TbFileTypeXls
        },
        txt: {
            icon: TbFileText
        },
        png: {
            icon: TbFileTypePng
        },
        jpg: {
            icon: TbFileTypeJpg
        },
        jpeg: {
            icon: TbFileTypeJpg
        },
    }

    const FileIcon = files[extension as keyof typeof files]?.icon || TbFile;

    return(
        <FileIcon className={className} />
    )

}