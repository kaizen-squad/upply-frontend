'use client'
import { useContext } from 'react'
import type { NotificationProps, NotificationType } from '../NotificationToast'
import { NotificationContext } from '../NotificationProvider'

export interface NotificationManager {
    notifications: NotificationProps[],
    notify: (message:string, type: NotificationType, persistant?:boolean) => void,
    removeNotification: (id:string) => void
}

const useNotificationManager = () => {
    const context = useContext<NotificationManager | undefined>(NotificationContext);
    if(context === undefined)
        throw new Error("Context is required!")
  
    return context

}

export default useNotificationManager