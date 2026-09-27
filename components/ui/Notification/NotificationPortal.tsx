'use client'
import { useEffect, useSyncExternalStore, type FC, type ReactNode } from "react"
import { createPortal } from "react-dom";

const subscribe = () => () => {};
const getNotificationRoot = () => document.getElementById('notification-root');
const getServerSnapshot = () => null;

interface NotificationPortalProps{
    children: ReactNode
}
const NotificationPortal:FC<NotificationPortalProps> = ( {children} ) => {
    const notificationRoot = useSyncExternalStore(subscribe, getNotificationRoot, getServerSnapshot);
    useEffect(()=>{
        if(!notificationRoot){
            console.warn("Notification root manquant pour l'affichage!")
        }
    }, [notificationRoot])
    if(!notificationRoot) return null;
  return createPortal(children, notificationRoot)
}

export default NotificationPortal
