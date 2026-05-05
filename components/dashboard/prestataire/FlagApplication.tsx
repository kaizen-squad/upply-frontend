import { ApplicationStatus } from "@/types"
import { FC } from "react"

export const flagColor ={
    EN_ATTENTE: 'scorpion-gray-37',
    ACCEPTEE: 'orange-alert',
    REJETEE: 'alizarin-crimson-red-51',
}

const FlagApplication:FC<{status:ApplicationStatus}> = ({status}) => {
  return (
        <small className="px-2 py-1 rounded-xs w-max text-white-solid scale-95 max-h-max" style={{backgroundColor: `var(--${flagColor[status]})`}}>{status.replace('_', ' ')}</small>
  )
}

export default FlagApplication