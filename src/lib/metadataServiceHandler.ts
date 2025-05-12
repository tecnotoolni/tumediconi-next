import es from "@/sources/lang.es";
import routes from "@/sources/routes";
import { ApiResponse } from "@/types/ApiResponse";
import { MetadataType } from "@/types/Metadata";


export async function getMetadataByType(type: MetadataType) {
    const context = routes.api.client.metadata;

    const response = await fetch(`${context.all}${type}`);

    if (!response.ok) {
        throw new Error(es.metadata.error.unknown);
    }

    return await response.json() as ApiResponse<MetadataType[]>;
}
