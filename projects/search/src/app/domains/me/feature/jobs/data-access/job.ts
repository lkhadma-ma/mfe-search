import { EmploymentType } from "./employment-type";
import { LocationType } from "./location-type";

export type Job = {
    id: string;
    position: string;
    location: string;
    employmentType: EmploymentType;
    locationType: LocationType;
    description: string;
    skills: {
        label: string;
        value: string;
    }[];
    search: {
        avatar: string;
    };
};

export type JobView = Pick<Job, 'id' | 'position' | 'locationType' | 'description' | 'search'>