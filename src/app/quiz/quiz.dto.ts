export interface QuizDto {
    id: number;
    frage: Frage[]
}

export interface Frage {
    id: number;
    frageText: string;
    frageBildUrl: string;
    optionen: Option[]

}

export interface Option {
    id: number;
    optionText: string;
    istRichtig: boolean;
}
