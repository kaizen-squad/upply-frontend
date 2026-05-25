'use client'
import { TaskProps } from '@/types/index';
import { useTasks } from '@/hooks/useTasks';
import TaskList from '@/components/shared/tasks/TaskList';
import { Plus, RotateCw } from 'lucide-react';
import Button from '@/components/ui/Button/Button';
import { useRouter } from 'next/navigation';
import EmptyImage from '@/components/shared/EmptyImage';

const page = () => {
    const {loading, tasks, refetch} = useTasks<TaskProps>('mine');
    const router = useRouter();
  return (
    <div className={tasks.length ? "w-full pb-10 px-2" : "h-(--main-height) w-full flex flex-col pb-10 px-2"}>
         <div>
            <h1>Vos Missions </h1>
            <p className="text-santa-gray mt-2">Explorez les missions que vous proposez.</p>
        </div>
        {
            tasks.length === 0 && !loading &&
              <div>
                <EmptyImage/>
                <div className="relative z-1">
                  <p className="text-xl font-bold text-center">Aucune mission disponible pour le moment!</p>
                  <p className="text-center lg:w-1/2 m-auto my-4 text-santa-gray text-md">Faites vos premières propositions ou continuez à offrir des opportunités.</p>
                </div>
                <div className="flex items-center gap-5 justify-center">
                  <Button 
                    Icon={Plus} 
                    textContent="Nouvelle mission" 
                    className={"w-max mt-8 items-center gap-3 text-white-solid rounded-sm bg-alizarin-crimson-red-51 px-6 py-3 font-semibold hidden sm:flex "}
                    onClick={()=>router.push('/client/tasks/new')}
                  />
                  <Button 
                    Icon={RotateCw} 
                    textContent="Rafraîchir la page" 
                    className={"w-max mt-8 items-center gap-3 text-black rounded-sm bg-iron-2-gray-84 px-6 py-3 font-semibold hidden sm:flex "}
                    onClick={()=>refetch('mine')}
                  />
                </div>
              </div>
        }
        <TaskList loading={loading} tasks={tasks} role="client" />
    </div>
  )
}

export default page