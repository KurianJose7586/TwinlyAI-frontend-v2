export interface UserProfile {
    id: string;
    email: string;
    role: "candidate" | "recruiter";
}

export interface Candidate {
    id: string;
    name: string;
    role: string;
    email: string;
    linkedin: string;
    quote: string;
    match: number;
    matchStyle: string;
    avatar: string;
    skills: string[];
    resume_url?: string;
    thumbnail_url?: string;
}
