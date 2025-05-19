import es from "@/sources/lang.es";
import { ApiResponse } from "@/types/ApiResponse";
import { Country, Municipality, State } from "@/types/Geolocalization";

export async function getCountries() {

    const response = await fetch("/api/geolocalization/country/all");

    if (!response.ok) {
        throw new Error(es.geolocalization.error.unknown);
    }

    return await response.json() as ApiResponse<Country[]>;
}

export async function getStatesByCountryCode(countryIsoCode: string) {
    const response = await fetch(`/api/geolocalization/country/${countryIsoCode}/state/all`);

    if (!response.ok) {
        throw new Error(es.geolocalization.error.unknown);
    }

    return await response.json() as ApiResponse<State[]>;
}

export async function getMunicipaltyByStateCode(stateIsoCode: string, countryIsoCode: string) {
    const response = await fetch(`/api/geolocalization/country/${countryIsoCode}/state/${stateIsoCode}/municipality/all`);

    if (!response.ok) {
        throw new Error(es.geolocalization.error.unknown);
    }

    return await response.json() as ApiResponse<Municipality[]>;
}