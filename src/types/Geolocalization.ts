import Status from "./Status";

export interface Country {
    id: number;
    name: string;
    isoCode?: string;
}

export interface State {
    id: number;
    name: string;
    isoCode?: string;
    countryID: number;
}

export interface Municipality {
    id: number;
    name: string;
    stateID: number;
}

export interface Location {
    id: number;
    name?: string;
    aproximateAddress?: string;
    lat?: number;
    lng?: number;
    status: Status;
    municipalityID: number;
    createdAt?: Date;
    updatedAt?: Date;
    removedAt?: Date;

    municipality?: Municipality;
}
