// app/ClientAuthProvider.tsx (composant client)
"use client";
import { useUserStore } from "@/hooks/store";
import { FC, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/auth";
import Spinner from "@/components/ui/Spinner/Spinner";

const ClientAuthProvider: FC<{children:ReactNode, initialUser: User | undefined}> = ({ children, initialUser }) => {
    const [loading, setLoading] = useState(true);
    const setUser = useUserStore(state => state.setUser);
    const router = useRouter();

    useEffect(() => {
        console.debug('[ClientAuthProvider] initialUser', initialUser, 'pathname', window.location.pathname);

        if (initialUser?.name) {
            setUser(initialUser);
        } else if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
            console.debug('[ClientAuthProvider] redirecting to /login');
            debugger
            router.push("/logout");
        }
        setLoading(false);

    }, [initialUser, setUser, router]);
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