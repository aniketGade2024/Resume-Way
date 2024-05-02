import { StateCreator } from "zustand";

export type IResumeInfo = {
    name: string;
    role: {
        resume_role: string;
        job_description_role: string;
    };
    location: {
        job_location: string;
        resume_location: string;
    };
    skills: {
        job_skills: string[];
        candidate_skills: string[];
    };
    education: {
        job_education: string;
        candidate_education: string;
    };
    yearsOfExperience: {
        job_experience: number;
        resume_experience: number;
    };
    responsibilitiesTaken: {
        job_responsibilities: string[],
        candidate_responsibilities: string[]
    };
    domain: string[];
    confidence_score: number;

}

export interface IResumeSlice {
    resumeInfo: IResumeInfo[];
    setResumeInfo: (resumeInfo: IResumeInfo) => void;
}

const createInfoSlice: StateCreator<IResumeSlice> = set => ({
    resumeInfo: [],
    setResumeInfo: (resumeInfo) => {
        set((state) => ({
            resumeInfo: [...state.resumeInfo, resumeInfo]
        }))
    }
})

export default createInfoSlice;