// app/ClientAuthProvider.tsx (composant client)
"use client";
import { useUserStore } from "@/hooks/store";
import { FC, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/auth";
import Spinner from "@/components/ui/Spinner/Spinner";
import apiFetch from "@/lib/api";

const ClientAuthProvider: FC<{children:ReactNode}> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const {setUser} = useUserStore();
    const router = useRouter();

    useEffect(() => {
        const loadStore = async ()=> {
            try{
                const userResponse = await apiFetch<User>('/api/auth/login');
                if (userResponse.success) {
                    setUser(userResponse.data);
                    console.log(userResponse)
                } else if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
                    console.debug('[ClientAuthProvider] redirecting to /login');
                    await apiFetch('/api/auth/logout')
                    router.push("/login");
                }
            }catch(e){}
            finally{
                setLoading(false);
            }            
        }
        loadStore();
    }, [setUser, router]);
    if(loading)
        return <div className="flex h-screen w-screen">
            <div className="flex items-center gap-3 h-max m-auto">
                <Spinner/>
                <p>Loading...</p>
            </div>
        </div>
    return <>{!loading && children}</>;
}

export default ClientAuthProvider;