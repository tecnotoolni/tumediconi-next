import Status from "./Status";

export default interface File {
    name: string | null;
    id: number;
    fileUrl: string | null;
    size: number | null;
    description: string | null;
    type: string | null;
    status: Status;
}