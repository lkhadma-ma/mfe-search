// job.dto.ts

export interface JobDto {
    id?: number;
    position?: string;
    location?: string;
    locationType?: LocationType;
    description?: string;
    employmentType?: EmploymentType;
    createdAt?: Date;
    updatedAt?: Date;
    company?: CompanyDto;
    skills: SkillDto[];
  }
  
  export interface CompanyDto {
    id?: number;
    name?: string;
    avatar?: string;
    description?: string;
    website?: string;
    size?: CompanySize;
  }
  
  export interface SkillDto {
    id?: number;
    name?: string;
    category?: SkillCategory;
  }
  
  export enum LocationType {
    REMOTE = 'REMOTE',
    HYBRID = 'HYBRID',
    ON_SITE = 'ON_SITE'
  }
  
  export enum EmploymentType {
    FULL_TIME = 'FULL_TIME',
    PART_TIME = 'PART_TIME',
    CONTRACT = 'CONTRACT',
    FREELANCE = 'FREELANCE',
    INTERNSHIP = 'INTERNSHIP'
  }
  
  export enum CompanySize {
    SMALL = '1-50',
    MEDIUM = '51-200',
    LARGE = '201-1000',
    ENTERPRISE = '1000+'
  }
  
  export enum SkillCategory {
    FRONTEND = 'FRONTEND',
    BACKEND = 'BACKEND',
    DATABASE = 'DATABASE',
    DEVOPS = 'DEVOPS',
    MOBILE = 'MOBILE',
    SOFT_SKILLS = 'SOFT_SKILLS'
  }
  