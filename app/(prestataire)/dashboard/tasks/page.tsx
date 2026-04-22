'use client'
import Task from "@/components/tasks/Task"
import { TaskSkeleton } from "@/components/tasks/TaskSkeleton"
import Button from "@/components/ui/Button/Button"
import { useTasks } from "@/hooks/useTasks"
import { RotateCw } from "lucide-react"

const page =  () => {
     const {loading, tasks, refetch} = useTasks();
    
  return (
    <div>
        <div>
            <h1>Missions Disponibles</h1>
            <p className="text-santa-gray mt-2">Explorez les opportunités du jour.</p>
        </div>

        {/* Rendu de loading */}

        {loading && 
            <div className="flex items-center flex-wrap gap-8 justify-center my-10">
                {Array(8).fill(0).map((p, index)=> <TaskSkeleton key={index} />)}
            </div>
        }

        {/* Rendu de no tasks */}
        {
            (!tasks.length && !loading) && 
            <div className="w-max max-w-4/5 m-auto mt-30 text-center lg:mt-40">
                <p className="text-2xl md:text-3xl font-semibold">Aucune mission disponible pour le moment</p>
                <p className="text-center lg:w-1/2 m-auto my-4 text-santa-gray">Revenez plus tard ou modifiez vos filtres de recherche pour découvrir de nouvelles opportunités.</p>
                <Button 
                    Icon={RotateCw} 
                    textContent="Rafraîchir la page" 
                    className={"w-max m-auto my-8 items-center gap-3 text-white-solid rounded-sm bg-alizarin-crimson-red-51 px-6 py-3 font-semibold hidden sm:flex "}
                    onClick={()=>window.location.reload()}
                />
            </div>
        }

        {/* Rendu de task */}

        {
            (Boolean(tasks.length) && !loading) &&
            <div className="flex items-center flex-wrap gap-8 justify-center my-10">
                {tasks.map((task)=><Task key={task.id} task={task} />)}
            </div>
        }


        <div className="flex items-stretch flex-1 m-auto gap-5 w-full mt-18 lg:mt-10 lg:w-[85%] lg:scale-80">
            <div className="text-center items-center gap-10 rounded-sm p-8 w-full bg-white-solid sm:bg-woodsmoke-gray-10 sm:w-[80%] lg:w-max lg:text-left lg:flex">
                <div className="lg:w-80">
                    <h2 className="text-woodsmoke-gray-10 text-3xl sm:text-white-solid ">Vous ne trouvez pas votre bonheur?</h2>
                    <p className="text-santa-gray mt-3 text-[0.9rem] sm:text-md">Abonnez-vous aux alertes pour être notifié des nouvelles missions en temps réel.</p>
                </div>
                <Button 
                    className="rounded-sm bg-alizarin-crimson-red-51 px-5 py-3 text-white-solid w-full m-auto mt-3 sm:w-max lg:m-0"
                    textContent="Créer une alerte"
                />
            </div>
            <div className="p-10 text-center rounded-sm border-2 border-gray-200 hidden sm:flex lg:w-100">
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