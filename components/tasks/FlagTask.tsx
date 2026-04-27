import { TaskStatus } from "@/types"
import { FC } from "react"

export const flagColor ={
    OUVERTE: 'scorpion-gray-37',
    EN_COURS: 'orange-alert',
    LIVREE: 'alizarin-crimson-red-51',
    VALIDEE: 'green-success'
}

const FlagTask:FC<{status:TaskStatus}> = ({status}) => {
  return (
        <small className="px-2 py-0.5 rounded-xs w-max text-white-solid scale-95" style={{backgroundColor: `var(--${flagColor[status]})`}}>{status}</small>
  )
}

export default FlagTask