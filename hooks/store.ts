import { User } from "@/types/auth";
import { create } from "zustand";

/**
 * User store Props
 */
type UserStoreProps={
    user: undefined | User,
    setUser: (user: User | undefined)=> void
}
/**
 * User store used to check role through the middleware
 */
const useUserStore = create<UserStoreProps>((set)=>({
    user: undefined,
    setUser: (userData)=>{set(()=>({user: userData}))}
}));

/**
 * Token store type
 */
type TokenStoreProps = {
    access_token: undefined | string,
    setAccessToken: (token: string | undefined)=> void
}

/**
 * Store used to save the access token.
 */
export const useTokenStore = create<TokenStoreProps>((set)=>({
    access_token: undefined,
    setAccessToken: (value)=>{set(()=>({access_token: value}))}
}));

export default useUserStore;
