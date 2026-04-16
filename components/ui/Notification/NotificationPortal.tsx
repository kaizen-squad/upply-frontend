'use client'
import { useEffect, useState, type FC, type ReactNode } from "react"
import { createPortal } from "react-dom";

interface NotificationPortalProps{
    children: ReactNode
}
const NotificationPortal:FC<NotificationPortalProps> = ( {children} ) => {
    const [notificationRoot, setNotificationRoot] = useState<HTMLElement | null>(null);
    useEffect(()=>{
        const root = document.getElementById('notification-root');
        setNotificationRoot(root);
        if(!root){
            console.warn("Notification root manquant pour l'affichage!")
            return 
        }
    }, [])
    if(!notificationRoot) return ;
  return createPortal(children, notificationRoot)
}

export default NotificationPortal