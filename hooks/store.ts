import { User } from "@/types/auth";
import { create } from "zustand";

type UserStoreProps = {
    user: User | undefined,
    setUser: (value: User)=>void
}

export const useUserStore = create<UserStoreProps>((set)=> ({
    user: undefined,
    setUser: (value: User)=> {set({user:value})}
}))

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

