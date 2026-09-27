'use client'
import { CircleCheck, CircleX, TriangleAlert, X, type LucideProps} from "lucide-react";
import { useRef, type FC, type ForwardRefExoticComponent, type RefAttributes, type TouchEvent } from "react"
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
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);
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
        <div
            className={typeClass + 'font-semibold my-2 py-3 px-4 rounded-md w-full slide-left touch-pan-y'}
            id={id}
            role="group"
            aria-label={type === 'error' ? 'Erreur' : 'Notification'}
            onTouchStart={(event: TouchEvent<HTMLDivElement>) => {
                const touch = event.changedTouches[0];
                touchStartRef.current = { x: touch.clientX, y: touch.clientY };
            }}
            onTouchEnd={(event: TouchEvent<HTMLDivElement>) => {
                const start = touchStartRef.current;
                const touch = event.changedTouches[0];
                touchStartRef.current = null;
                if (!start || !touch) return;
                if (event.target instanceof Element && event.target.closest('button')) return;

                const horizontalDistance = touch.clientX - start.x;
                const verticalDistance = touch.clientY - start.y;
                if (Math.abs(horizontalDistance) >= 60 && Math.abs(horizontalDistance) > Math.abs(verticalDistance)) {
                    close();
                }
            }}
        >
            <div className="flex justify-end">
              <button
                type="button"
                aria-label="Fermer la notification"
                onClick={close}
                className="rounded p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
              >
                <X aria-hidden="true" className='w-4 h-4' />
              </button>
            </div>
            <div className="flex gap-1 mr-4" aria-live={type === 'error' ? 'assertive' : 'polite'} aria-atomic="true">
              <Icon/>   
              <span>{message}</span>
            </div>           
        </div>    
  )
}

export default NotificationToast
