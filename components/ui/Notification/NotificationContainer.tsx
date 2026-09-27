'use client'
import type { FC } from 'react'
import NotificationPortal from './NotificationPortal'
import NotificationToast from './NotificationToast'
import useNotificationManager from './hooks/useNotificationManager';


const NotificationContainer:FC = () => {
  const { notifications, removeNotification } = useNotificationManager();
  return (
    <NotificationPortal>
        <div className='fixed top-4 right-4 z-1000 animation w-[calc(100vw-2rem)] max-w-sm sm:max-w-md max-h-[80dvh] overflow-y-auto'>
            <div className='relative'>                
                {notifications.map((nt) => <NotificationToast key={nt.id} {...nt} close={()=>removeNotification(nt.id)} />)}
            </div>            
        </div>
    </NotificationPortal>
  )
}

export default NotificationContainer
