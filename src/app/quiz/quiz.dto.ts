export interface QuizDto {
    id: number;
    frage: Frage[]
}

interface Frage {
    id: number;
    frageText: string;
    optionen: Option[]

}

interface Option {
    id: number;
    optionText: string;
    istRichtig: boolean;
}
