import { User } from "@/types/auth";
import type { ApplicationResponse, ApplicationStatus } from "@/types";
import { create } from "zustand";

type UserStoreProps = {
    user: User | undefined,
    setUser: (value: User)=>void
}

export const useUserStore = create<UserStoreProps>((set)=> ({
    user: undefined,
    setUser: (value: User)=> {set({user:value})}
}))

type ApplicationsStoreProps = {
    applications: ApplicationResponse[],
    setApplications: (applications: ApplicationResponse[]) => void,
    updateApplicationStatus: (applicationId: string, status: ApplicationStatus) => void
}

export const useApplicationsStore = create<ApplicationsStoreProps>((set) => ({
    applications: [],
    setApplications: (applications) => set({ applications }),
    updateApplicationStatus: (applicationId, status) => set((state) => ({
        applications: state.applications.map((application) =>
            application.id === applicationId ? { ...application, status } : application
        )
    }))
}));

/**
 * Token store type
 */
type TokenStoreProps = {
    accessToken: undefined | string,
    setAccessToken: (token: string | undefined)=> void
}

/**
 * Store used to save the access token.
 */
export const useTokenStore = create<TokenStoreProps>((set)=>({
    accessToken: undefined,
    setAccessToken: (value)=>{set(()=>({accessToken: value}))}
}));

