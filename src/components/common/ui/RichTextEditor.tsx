import { useEffect, useState } from "react";
import Tiptap from "./Tiptap";

interface Props {
    label: string;
    value?: string;
    onChange?: (value: string) => void;
}

export default function RichTextEditor({ label, value, onChange }: Props) {
    const [data, setData] = useState<string | undefined>(value);

    useEffect(() => {
        console.log("value", value);
        setData(value);
    }, [value]);

    return(
        <div className="flex flex-col gap-1">
            <label className="text-gray-600 leading-tight font-medium">
                {label}
            </label>
            <Tiptap onChange={onChange} value={data} />
        </div>
    )

}