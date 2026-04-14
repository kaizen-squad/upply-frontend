import { User } from "@/types/auth";
import { create } from "zustand";

type UserStoreProps={
    user: undefined | User,
    setUser: (user: User | undefined)=> void
}

const useUserStore = create<UserStoreProps>((set)=>({
    user: undefined,
    setUser: (userData)=>{set((state)=>({user: userData}))}
}));

export default useUserStore;