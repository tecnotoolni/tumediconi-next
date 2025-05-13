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