'use client'
import type { TaskProps } from "@/types"
import { FC } from "react"
import Button from "../../ui/Button/Button";
import { useRouter } from "next/navigation";
import FlagTask from "./FlagTask";

export const flagColor ={
        OUVERTE: 'scorpion-gray-37',
        EN_COURS: 'orange-alert',
        LIVREE: 'alizarin-crimson-red-51',
        VALIDEE: 'green-success'
}

const Task: FC<{task:TaskProps}> = ({task}) => {
    const {id, client_id, prestataire_id, title, description, budget, deadline, status} = task;
    
    const router = useRouter();
  return (
    <div className="bg-white-solid border-2 border-gray-200 shadow-2xs w-[280px] rounded-sm">
        <div className="p-5">
            <div className="flex justify-end">
                <FlagTask status={status} />
            </div>
            <p className="text-xl font-medium my-3">{title}</p>
            <p className="text-sm text-santa-gray my-3 line-clamp-2">{description}</p>

            <div className="mt-5">
                <div className="flex items-center justify-between">
                    <p className="text-scorpion-gray-37 text-[0.85rem]">REMUNERATION</p>
                    <p className="text-lg text-alizarin-crimson-red-51 font-semibold">{budget}.00 €</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-scorpion-gray-37 text-[0.85rem]">ECHEANCE</p>
                    <p className="">{deadline}</p>
                </div>
            </div>
        </div>
        
        <div className="py-4 bg-gallery-gray-93 rounded-b-xs">
            <Button 
                className="block w-[85%] m-auto py-2.5 bg-woodsmoke-gray-10 text-white-solid rounded-sm"
                textContent="Voir la tâche"
                onClick={()=> router.push(`/dashboard/tasks/${id}`)}
            />
        </div>
    </div>
  )
}

export default Task

