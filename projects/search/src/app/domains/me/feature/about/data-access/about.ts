import { searchSize } from "./search-size";


export type About = {
    id?: string;
    overview: string;
    website: string;
    industry: string;
    searchSize: searchSize;
    founded: string;
    specialties: string;
};