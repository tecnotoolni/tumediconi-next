import { Country, Municipality, State } from "@/types/Geolocalization";
import { Metadata } from "@/types/Metadata";
import Option from "@/types/Option";

export const convertToOptionsFromMetadata = (data: Metadata[]): Option[] => {
    return data.map((item) => ({
        value: item.id.toString(),
        label: item.value,
    }));
}

export const convertToOptionsFromCountries = (data: Country[]): Option[] => {
    return data.map((item) => ({
        value: item.isoCode || "",
        label: item.name,
    }));
}

export const convertToOptionsFromStates = (data: State[]): Option[] => {
    return data.map((item) => ({
        value: item.isoCode || "",
        label: item.name,
    }));
}

export const convertToOptionsFromMunicipalities = (data: Municipality[]): Option[] => {
    return data.map((item) => ({
        value: item.id.toString(),
        label: item.name,
    }));
}