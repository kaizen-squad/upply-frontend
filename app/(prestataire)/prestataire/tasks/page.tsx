'use client'
import EmptyImage from "@/components/shared/EmptyImage";
import TaskList from "@/components/shared/tasks/TaskList";
import Button from "@/components/ui/Button/Button";
import { useTasks } from "@/hooks/useTasks"
import { TaskPropsOnPrestataire } from "@/types";
import { RotateCw } from "lucide-react";

const page =  () => {
    const {loading, tasks, refetch} = useTasks<TaskPropsOnPrestataire>(undefined);

  return (
    <div className={tasks.length ? "w-full" : "py-10 w-full h-(--main-height) flex flex-col"}>
        <div>
            <h1>Missions Disponibles</h1>
            <p className="text-santa-gray mt-2">Explorez les opportunités du jour.</p>
        </div>
        {
            (tasks.length === 0 && !loading) &&
                <div className="w-[90%] lg:max-w-4/5 m-auto h-max text-center scale-90">
                    <EmptyImage/>
                        
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

        <TaskList loading={loading} tasks={tasks} role="prestataire" />       
    </div>
  )
}

export default page