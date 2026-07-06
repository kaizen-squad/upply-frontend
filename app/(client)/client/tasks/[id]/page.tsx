'use client'
import TaskForm from '@/components/dashboard/client/TaskForm';
import TaskDetails from '@/components/shared/tasks/TaskDetails';
import { useTasksContext } from '@/components/shared/tasks/TaskProvider';
import Button from '@/components/ui/Button/Button';
import { useModalify } from '@/components/ui/Modal/hooks/useModalify';
import Spinner from '@/components/ui/Spinner/Spinner';
import { Edit, Truck, UserCircle2, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const page = () => {
  const {tasks:[task], loading, refetch} = useTasksContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const route = useRouter();
  const {modalify} = useModalify();

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
        <TaskDetails role="client" loading={loading} task={task} >
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
                    <div>
                      {task.status === 'OUVERTE' 
                      ? 
                      <div className="flex gap-3 items-center flex-col xs:flex-row xl:flex-col mb-10 xl:mb-5">
                        <Button
                        textContent="Modifier la mission"
                        Icon={Edit}
                        onClick={()=> {
                            modalify(
                              <TaskForm isEditing={true} field_values={task} setIsEdited={setIsEdited}/>
                            ,{
                              title: 'Edition de la mission',
                              size:'lg'
                            })
                        }}
                        className="py-3 rounded-md bg-woodsmoke-gray-8 w-full text-white font-bold"
                        />
                      
                        <Button
                        textContent="Voir les candidatures"
                        Icon={UserCircle2}
                        className="py-3 rounded-md bg-alizarin-crimson-red-51 w-full text-white font-bold"
                        onClick={()=> route.push(`/client/tasks/${task.id}/applications`)}
                        />
                      </div>
                    :
                      <Button
                      textContent="Voir le livrable"
                      Icon={Truck}
                      className="py-3 rounded-md bg-alizarin-crimson-red-51 w-full text-white font-bold"
                      onClick={()=> route.push(`/client/tasks/${task?.id}/validate`)}/> 
                    }
                    </div>
                }
                </div>
              
              <div className="bg-woodsmoke-gray-10 p-5 mt-5 h-max">
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
            <div className="mt-10 lg:mt-0">
              
            </div>
          }
        </TaskDetails>
    </div>
  )
}

export default page