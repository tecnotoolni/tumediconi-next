

export function convertToReadableDate(dateStr?: string): string {
    const date = new Date(dateStr || "");
    if (isNaN(date.getTime())) return "";

    return date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

export function formatDateToISO(dateStr?: string): string {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().slice(0, 10);
}