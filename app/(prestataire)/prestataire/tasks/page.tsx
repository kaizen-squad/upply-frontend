'use client'
import Task from "@/components/shared/tasks/Task"
import { TaskSkeleton } from "@/components/shared/tasks/TaskSkeleton"
import Button from "@/components/ui/Button/Button"
import { useTasks } from "@/hooks/useTasks"
import { ApplicationResponse, TaskProps } from "@/types";
import { useMediaQuery } from "@reactuses/core";
import { RotateCw } from "lucide-react"
import Image from "next/image";

const page =  () => {
    const {loading, tasks, refetch} = useTasks<ApplicationResponse>(undefined);
    const isMobile = useMediaQuery('(max-width: 700px)', true);

  return (
    <div className={tasks.length ? "" : "py-10 w-full h-(--main-height) flex flex-col"}>
        <div>
            <h1>Missions Disponibles</h1>
            <p className="text-santa-gray mt-2">Explorez les opportunités du jour.</p>
        </div>

        {/* Rendu de loading */}

        {loading && 
            <div className="flex items-center flex-wrap gap-8 justify-center my-10">
                {Array(9).fill(0).map((p, index)=> <TaskSkeleton key={index} />)}
            </div>
        }

        {/* Rendu de no tasks */}
        {
            (!tasks.length && !loading) && 
            <div className="w-[90%] lg:max-w-4/5 m-auto h-max text-center scale-90">
                {
                    isMobile ? 
                        <Image
                            src={'/Assets/Empty_Mobile.svg' }
                            alt="empty-box"
                            height={100}
                            width={100}
                            className="scale-200 z-0 -translate-y-10 m-auto"
                            loading="eager"
                        /> 
                    :
                        <Image
                            src={'/Assets/Empty_Desktop.svg'}
                            alt="empty-box"
                            height={200}
                            width={200}
                            className="scale-200 z-0 m-auto"
                            loading="eager"
                        /> 

                }
                
                <div className="relative z-1">
                    <p className="w-[80%] md:w-full m-auto text-3xl font-semibold">Aucune mission disponible pour le moment</p>
                    <p className="text-center lg:w-1/2 m-auto my-4 text-santa-gray text-md">Revenez plus tard ou modifiez vos filtres de recherche pour découvrir de nouvelles opportunités.</p>
                </div>
                <Button 
                    Icon={RotateCw} 
                    textContent="Rafraîchir la page" 
                    className={"w-max m-auto mt-8 items-center gap-3 text-white-solid rounded-sm bg-alizarin-crimson-red-51 px-6 py-3 font-semibold hidden sm:flex "}
                    onClick={()=>refetch(undefined)}
                />
            </div>
        }

        {/* Rendu de task */}

        {
            (Boolean(tasks.length) && !loading) &&
            <div className="flex items-center flex-wrap gap-5 justify-center my-10">
                {tasks.map((task)=><Task key={task.id} task={task} />)}
            </div>
        }


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
  )
}

export default page