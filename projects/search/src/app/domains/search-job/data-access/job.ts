export interface Job {
    id: number;
    position: string;
    location: string;
    locationType: LocationType;
    description: string;
    employmentType: EmploymentType;
    createdAt: Date;
    updatedAt: Date;
    company: Company;
    skills: Skill[];
  }
  
  export interface Company {
    username: string;
    name: string;
    avatar: string;
    about: About;
  }
  
  export interface About {
    overview: string;
    website: string;
    companySize: CompanySize;
  }
  
  export interface Skill {
    value: number;
    label: string;

  }
  
  export enum LocationType {
    REMOTE = 'REMOTE',
    HYBRID = 'HYBRID',
    ON_SITE = 'ON_SITE'
  }
  
  export enum EmploymentType {
    FULL_TIME = "FULL_TIME",
    PART_TIME = "PART_TIME",
    SELF_EMPLOYED = "SELF_EMPLOYED",
    FREELANCE = "FREELANCE",
    CONTRACT = "CONTRACT",
    INTERNSHIP = "INTERNSHIP",
    APPRENTICESHIP = "APPRENTICESHIP",
    TEMPORARY_CIVIL_SERVANT = "TEMPORARY_CIVIL_SERVANT",
    DIRECT_CONTRACT = "DIRECT_CONTRACT",
    LIFETIME_CIVIL_SERVANT = "LIFETIME_CIVIL_SERVANT",
    CO_OP = "CO_OP",
  }
  
  
  export enum CompanySize {
    ONE_TO_TEN = "1-10",
    ELEVEN_TO_FIFTY = "11-50",
    FIFTY_ONE_TO_TWO_HUNDRED = "51-200",
    TWO_HUNDRED_ONE_TO_FIVE_HUNDRED = "201-500",
    FIVE_HUNDRED_ONE_TO_ONE_THOUSAND = "501-1000",
    ONE_THOUSAND_PLUS = "1001+",
  }
  