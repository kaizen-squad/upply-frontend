'use client'
import type { TaskProps } from "@/types"
import { FC } from "react"
import Button from "../../ui/Button/Button";
import { useRouter } from "next/navigation";
import FlagTask from "./FlagTask";
import { budgetCurrency } from "@/hooks/useTasks";
import { formatAmount } from "@/lib/utils";

export const flagColor ={
        OUVERTE: 'scorpion-gray-37',
        EN_COURS: 'orange-alert',
        LIVREE: 'alizarin-crimson-red-51',
        VALIDEE: 'green-success'
}

const Task: FC<{task:TaskProps, role:string}> = ({task, role}) => {
    const {id, title, description, budget, deadline, status} = task;

    const router = useRouter();
  return (
    <div className="bg-white-solid border-2 border-gray-200 shadow-2xs rounded-sm flex flex-col justify-between w-full">
        <div className="p-5">
            <div className="flex justify-end">
                <FlagTask status={status} />
            </div>
            <p className="text-xl font-medium my-3">{title}</p>
            <p className="text-sm text-santa-gray my-3 line-clamp-2 h-10">{description}</p>

            <div className="mt-5">
                <div className="flex gap-5 items-center justify-between">
                    <p className="text-scorpion-gray-37 text-[0.85rem]">REMUNERATION</p>
                    <p className="text-lg text-alizarin-crimson-red-51 font-semibold line-clamp-1 text-right">{formatAmount(budget)} {budgetCurrency}</p>
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
                onClick={()=> router.push(`/${role}/tasks/${id}`)}
            />
        </div>
    </div>
  )
}

export default Task

