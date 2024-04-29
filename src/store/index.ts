import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import createInfoSlice, { IResumeSlice } from "./createInfoSlice";

type IStore = IResumeSlice;


const useAppStore = create<IStore>()(
    persist(
        (set, get, api) => ({
            ...createInfoSlice(set, get, api)
        }),
        {
            name: "app-storage",
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)

export default useAppStore;