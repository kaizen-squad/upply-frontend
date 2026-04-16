import { HTMLAttributes, ReactNode } from "react"

type CardProps = {
    children: ReactNode,
    classname?: string
} & HTMLAttributes<HTMLDivElement>

const Card:React.FC<CardProps> = ({children, classname, ...props}) => {
  return (
    <div {...props} className={"rounded-2xl shadow-2xs border-gray-300 border-[0.5px] p-4 " + classname}>
        {children}
    </div>
  )
}

export default Card