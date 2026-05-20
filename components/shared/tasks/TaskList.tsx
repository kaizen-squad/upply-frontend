'use client'
import Task from "@/components/shared/tasks/Task"
import { TaskSkeleton } from "@/components/shared/tasks/TaskSkeleton"
import Button from "@/components/ui/Button/Button"
import { TaskPropsOnPrestataire, TaskProps } from "@/types";
import { useMediaQuery } from "@reactuses/core";
import { RotateCw } from "lucide-react"
import Image from "next/image";
import { FC } from "react";

const TaskList:FC<{loading: boolean; tasks: TaskPropsOnPrestataire[] | TaskProps[], role:string}> =  ({loading, tasks, role}) => {

  return (
    <div className={tasks.length ? "" : "w-full flex flex-col"}>
        {/* Rendu de loading */}

        {loading && 
            <div className="flex items-center flex-wrap gap-8 justify-center my-10">
                {Array(8).fill(0).map((p, index)=> <TaskSkeleton key={index} />)}
            </div>
        }

       
        <div className="flex flex-col gap-10 justify-between h-full">
            <div>
                {
                    (Boolean(tasks.length) && !loading) &&
                    <div className="grid xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 my-10 items-stretch justify-center">
                        {tasks.map((task)=><Task role={role} key={task.id} task={task} />)}
                    </div>
                }
            </div>

            <div className="flex items-stretch justify-center h-max gap-5 w-full lg:scale-90">
                <div className="text-center items-center gap-10 rounded-sm px-8 sm:p-8 w-full sm:bg-woodsmoke-gray-10 sm:w-full lg:w-max lg:text-left lg:flex">
                    <div className="lg:w-80">
                        <p className="text-woodsmoke-gray-10 text-4xl font-bold sm:text-[1.5rem] sm:text-white-solid ">Vous ne trouvez pas votre bonheur?</p>
                        <p className="text-santa-gray mt-3 w-[80%] m-auto sm:w-full">Abonnez-vous aux alertes pour être notifié des nouvelles missions en temps réel.</p>
                    </div>
                    <Button 
                        className="rounded-sm bg-alizarin-crimson-red-51 px-5 py-3 text-white-solid w-[75%] m-auto mt-3 sm:w-max lg:m-0"
                        textContent="Créer une alerte"
                    />
                </div>
                <div className="p-10 text-center rounded-sm border-2 border-gray-200 hidden lg:flex lg:w-100">
                    <div className="m-auto h-max">
                        <p className="text-3xl lg:text-5xl font-bold">{tasks.length}</p>
                        <p className="text-santa-gray text-[0.85rem]">Missions actives</p>
                    </div>
                </div>
            </div>

        </div>    
    </div>
  )
}

export default TaskList