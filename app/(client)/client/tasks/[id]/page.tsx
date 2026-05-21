'use client'
import TaskForm from '@/components/dashboard/client/TaskForm';
import TaskDetails from '@/components/shared/tasks/TaskDetails';
import { useTasksContext } from '@/components/shared/tasks/TaskProvider';
import Button from '@/components/ui/Button/Button';
import Spinner from '@/components/ui/Spinner/Spinner';
import { Edit, Truck, UserCircle2, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {
  const {tasks:[task], loading, refetch} = useTasksContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const route = useRouter();

  useEffect(()=>{
    if(isEdited){
      refetch(task.id);
    }
  },[isEdited])

  if(loading){
    return (
        <div className="flex h-max items-center gap-3 w-max m-auto">
          <Spinner/>
          <p>Loading tasks details...</p>
        </div>
    )
  }
  if(task)
    return (
    <div className="w-full">
        <TaskDetails loading={loading} task={task} >
          {
            !isEditing ? (
              <div className="mt-10 xl:mt-0">
                <p className="mb-5 text-xl font-semibold xl:hidden ">ZONE DE GESTION</p>
                <div>
                  {
                    task.status === 'VALIDEE' ?
                    <Button
                      Icon={UserCircle2}
                      textContent="Noter le prestataire"
                      className="py-3 rounded-md bg-alizarin-crimson-red-51 w-full text-white font-bold"
                      onClick={()=> route.push(`/client/tasks/${task.id}/review`)}
                    />
                    : 
                    <div className="flex gap-5 items-center xl:flex-col mb-10 xl:mb-5">
                      <Button
                      textContent="Modifier la mission"
                      Icon={Edit}
                      onClick={()=> setIsEditing(true)}
                      className="py-3 rounded-md bg-woodsmoke-gray-8 w-full text-white font-bold"
                    />
                    {
                      task.status === 'OUVERTE' 
                      ? <Button
                      textContent="Voir les candidatures"
                      Icon={UserCircle2}
                      className="py-3 rounded-md bg-alizarin-crimson-red-51 w-full text-white font-bold"
                      onClick={()=> route.push(`/client/tasks/${task.id}/applications`)}
                    />:
                      <Button
                      textContent="Voir le livrable"
                      Icon={Truck}
                      className="py-3 rounded-md bg-alizarin-crimson-red-51 w-full text-white font-bold"
                      onClick={()=> route.push(`/client/tasks/${task?.id}/validate`)}/> 
                    }
                    </div>
                }
                </div>
              
              <div className="bg-woodsmoke-gray-10 p-5 mt-3">
               <div className="flex items-center gap-4 text-white">
                 <div className="px-4 py-2 bg-alizarin-crimson-red-51 font-black">U</div>
                 <div>
                     <small className="text-santa-gray">CLIENT VERIFIE</small>
                     <p className="font-bold">Upply Logistique Hub</p>
                 </div>
               </div>
               <Image
                     src={'/Assets/NotationUpply.svg'}
                     width={500}
                     height={500}
                     alt="notation-upply"
                     className="my-3"
                 />
               <p className="text-santa-gray">Plus de 500 missions complétées avec succès sur la plateforme. Paiement garanti sous 24h après validation.</p>
           </div>

            </div>
            )
            :
            <div className="relative mt-10 lg:mt-0">
              <Button
                textContent=""
                Icon={X}
                className="rounded-full p-3 bg-gallery-gray-93 absolute right-3 top-3"
                onClick={()=>setIsEditing(false)}
              />
              <TaskForm isEditing={true} field_values={task} setIsEdited={setIsEdited}/>
            </div>
          }
        </TaskDetails>
    </div>
  )
}

export default page