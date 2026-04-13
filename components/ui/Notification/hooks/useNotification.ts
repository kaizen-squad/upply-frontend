import { useCallback, type Dispatch, type SetStateAction } from 'react'
import type { NotificationProps, NotificationType } from '../NotificationToast'

const NOTIFICATION_TIME = 4000;

const useNotification = (notifications:NotificationProps[], setNotifications:Dispatch<SetStateAction<NotificationProps[]>>) => {
    
    const removeNotification = async (id:string) => {
        const notification = document.getElementById(id);
        if(!notification) return;
        const animate = notification?.animate([
            {opacity: 0, transform: 'translateX(-100px)'}
        ], {duration: 500, easing: 'ease-in-out', fill: 'forwards'});
        
        if(animate)
            animate.onfinish = () => setNotifications((prev:NotificationProps[]) => prev.filter(n => n.id !== id))
                             
    }

    const renderNotification = useCallback((message:string, type:NotificationType, persistant: boolean=false)=>{

        const newNotification: NotificationProps = {
            persistant: persistant,
            id: Date.now().toString(),
            type: type,
            message: message,
            close: ()=>removeNotification(newNotification.id)
        }

        setNotifications(prev => [...prev, newNotification])
        if(!persistant)
            setTimeout(() => removeNotification(newNotification.id), NOTIFICATION_TIME)

    }, [removeNotification])

    

  return {
    notify: renderNotification,
    notifications: notifications, 
    removeNotification
  }
}

export default useNotification