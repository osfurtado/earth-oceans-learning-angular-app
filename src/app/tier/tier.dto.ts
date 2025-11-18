export interface TierDto {
    id: number;
    name: string;
    beschreibung: string;
    laenge: string;
    gewicht: string;
    bildUrl: string;
    tief: string;
    ernaerung: Ernaerung[];
    raubtiere: Raubtiere[]
}

interface Ernaerung {
    name: string;
    bildUrl: string;
}

interface Raubtiere {
    name: string;
    bildUrl: string;
}
