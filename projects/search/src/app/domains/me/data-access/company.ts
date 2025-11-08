export interface searchComplated {
    username: string;
    address: string;
    avatar: string;
    headline: string;
    name: string;
    bg: string;
}

export type searchHeader = Pick<searchComplated, 'name' | 'headline' | 'avatar' | 'bg'>;
