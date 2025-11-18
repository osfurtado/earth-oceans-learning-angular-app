import { QuizDto } from "../quiz/quiz.dto";
import { TierDto } from "../tier/tier.dto";

export interface MeerDto {
    id: number;
    name: string;
    tief: string;
    groesse: string;
    temperatur: string;
    bildUrl: string;
    features: MeerSpecialFeatures[]
    tiere: TierDto[],
    quiz: QuizDto[]
}

interface MeerSpecialFeatures {
    feature: string;
    beschreibung: string;
    bildUrl: string;
}
