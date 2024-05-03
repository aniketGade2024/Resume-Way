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
        resume_skills: string[];
    };
    education: {
        job_education: string;
        resume_education: string;
    };
    yearsOfExperience: {
        job_experience: number;
        resume_experience: number;
    };
    responsibilitiesTaken: {
        job_responsibilities: string[],
        resume_responsibilities: string[]
    };
    domain: string;
    confidence: number;
}

export type IReport = {
    candidate: {
        name: string;
        role: string;
        skills: string[];
        years_of_experience: number;
    };
    questions: string[];
    soft_skills_questions: string[];
    technical_questions: string[];

}

export interface IResumeSlice {
    resumeInfo: IResumeInfo[];
    setResumeInfo: (resumeInfo: IResumeInfo) => void;
    report: IReport;
    setReport: (report: IReport) => void;
}

const createInfoSlice: StateCreator<IResumeSlice> = set => ({
    resumeInfo: [],
    setResumeInfo: (resumeInfo) => {
        set((state) => ({
            resumeInfo: [...state.resumeInfo, resumeInfo]
        }))
    },
    report: {
        candidate: {
            name: "", role: '', skills: [], years_of_experience: 0
        },
        questions: [],
        soft_skills_questions: [],
        technical_questions: []
    },
    setReport: (report: IReport) => {
        set({ report })
    }
})

export default createInfoSlice;