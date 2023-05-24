export interface Meanings {
    partOfSpeech: string;
}
export interface WordResponse {
    word: string;
    phonetics: Array<phonetic>
    origin: string;
    meanings: Array<Meaning>
}

export interface Meaning {
    partOfSpeech: string;
    definitions: Array<definition>
    synonyms: string[];
    antonyms: string[];
}

export interface definition {
    definition: string;
    example?: string;
}
export interface phonetic {
    text: string;
    audio: string;
}