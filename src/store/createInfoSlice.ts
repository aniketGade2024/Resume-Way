import { StateCreator } from "zustand";

export type IResumeInfo = {
    name: string;
    skills: string[],
}

export interface IResumeSlice {
    resumeInfo: IResumeInfo;
    setResumeInfo: (resumeInfo: IResumeInfo) => void;
}

const createInfoSlice: StateCreator<IResumeSlice> = set => ({
    resumeInfo: {
        name: '',
        skills: []
    },
    setResumeInfo: (resumeInfo) => {
        set({ resumeInfo })
    }
})

export default createInfoSlice;