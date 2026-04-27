'use client'
import { CircleCheck, CircleX, TriangleAlert, X, type LucideProps} from "lucide-react";
import type { FC, ForwardRefExoticComponent, RefAttributes } from "react"
import './NotificationToast.css'

export type NotificationType = 'success' | 'error' | 'warning'
export interface NotificationProps {
    persistant?: boolean,
    type: NotificationType,
    message: string,
    id: string,
    close: ()=>void
}

const NotificationToast: FC<NotificationProps> = ({type, message, id, close}) => {
    let typeClass = '';
    let Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> = CircleCheck;
    switch(type){
        case 'success':
            typeClass = 'bg-green-500 text-white ';
            Icon = CircleCheck;
            break;
        case 'error':
            typeClass = 'bg-red-300 text-red-500 ';
            Icon = CircleX;
            break;
        case 'warning':
            typeClass = 'bg-yellow-400 text-white ';
            Icon = TriangleAlert
    }   
  return (
        <div className={typeClass + 'font-semibold my-2 py-3 px-4 rounded-md w-full slide-left'} id={id}>
            <div className="w-full justify-items-end"><X className='w-4 h-4 flex justify-end' onClick={close}></X></div>
            <div className="flex gap-1 mr-4">
              <Icon/>   
              <span>{message}</span>
            </div>           
        </div>    
  )
}

export default NotificationToast