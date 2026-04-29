// app/ClientAuthProvider.tsx (composant client)
"use client";
import { useUserStore } from "@/hooks/store";
import { FC, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/auth";

const ClientAuthProvider: FC<{children:ReactNode, initialUser: User | undefined}> = ({ children, initialUser }) => {
    const [loading, setLoading] = useState(true);
    const setUser = useUserStore(state => state.setUser);
    const router = useRouter();

    useEffect(() => {

        // if (initialUser?.id) {
        //     setUser(initialUser);
        // } else if (window.location.pathname !== "/login") {
        //     router.push("/login");
        // }
        // setLoading(false);

    }, [initialUser, setUser, router]);

    return <>{loading && children}</>;
}

export default ClientAuthProvider;