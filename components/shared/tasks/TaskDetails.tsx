'use client'
import { formatAmount, formatFrenchDateIntl, formatRelativeTime } from '@/lib/utils';
import { TaskProps } from '@/types';
import{ FC, ReactNode } from 'react'
import FlagTask from './FlagTask';
import Spinner from '@/components/ui/Spinner/Spinner';
import Image from 'next/image';
import { budgetCurrency } from '@/hooks/useTasks';
import Button from '@/components/ui/Button/Button';
import { Trash2 } from 'lucide-react';
import { useModalify } from '@/components/ui/Modal/hooks/useModalify';
import { useTasksContext } from './TaskProvider';
import { useMediaQuery } from '@reactuses/core';
import { Role } from '@/types/auth';

const TaskDetails:FC<
  | { loading: boolean; task: TaskProps; children:ReactNode, role:'client'|'prestataire' }
> = ({ loading, task, children, role }) => {

  const {modalify, close} = useModalify();
  const {deleteTask} = useTasksContext();
  const isMobile = useMediaQuery('(max-width: 768px)', true);

  return (
    <>     
     {/* Chargement */}
        {  
        loading ? 
          <div className="flex items-center gap-2 h-max m-auto">
            <Spinner/> 
            <p>Loading...</p>
          </div>
          :
          <div>
            {/* Lorsque c'est ok */}
            {
              (!loading && task) &&
              <div>
                {
                  !isMobile && <div className="hidden md:flex items-center justify-between gap-5 w-full">
                  <div>
                    <FlagTask status={task.status} />
                    <h1 className="mt-3">{task.title}</h1>
                    <p className="my-2 text-scarpa-flow-gray-34">{formatRelativeTime(task.created_at ?? '')}</p>
                  </div>
                    {
                      role ==='client' && <Button
                      textContent=""
                      Icon={Trash2}
                      className="rounded-full p-3 bg-red-500 text-white"
                      title="supprimer la mission"
                      onClick={()=> modalify(<DeleteModale task_id={task.id} />, {
                        id:'delete-task',
                        title: 'Suppression de mission'
                      })}
                    />}                
              </div>
              }
              {
                isMobile &&
                <div>
                  <div className="block bg-white md:hidden p-5 border border-gray-200 shadow-2xs rounded-sm">
                    <div className="flex justify-between items-center">
                      <FlagTask status={task.status} />
                      <div className="w-max text-right">
                        <small className="text-scarpa-flow-gray-34 font-semibold">BUDGET</small>
                        <p className="text-alizarin-crimson-red-51 font-black text-2xl">{formatAmount(task.budget)}</p>
                      </div>
                    </div>
                    
                    <h1 className="my-3">{task.title}</h1>
                    <hr className="border border-gray-100 my-6" />

                    <div className="flex justify-between items-end">
                      <div>
                        <small className="text-scarpa-flow-gray-34 font-semibold">DATE LIMITE</small>
                        <div className="flex items-center gap-1">
                          <Image
                            width={15}
                            height={15}
                            alt="deadline-icon"
                            src={'/Assets/Deadline_Icon.svg'}
                          />
                          <p>{formatFrenchDateIntl(task.deadline)}</p>
                        </div>
                      </div>
                      {
                        role ==='client' && 
                        <Button
                          textContent="Supprimer"
                          Icon={Trash2}
                          className="rounded-md py-2 px-4 bg-alizarin-crimson-red-51 text-white"
                          title="supprimer la mission"
                          onClick={()=> modalify(<DeleteModale task_id={task.id} />, {
                            id:'delete-task',
                            title: 'Suppression de mission'
                        })}
                        />
                      }  

                    </div>
                  </div>
                </div>
                }
                
                <div className="mt-5 grid xl:grid-cols-[60%_1fr] gap-7">
                  {/* A gauche */}
                    <div>
                        <div className="hidden md:grid grid-cols-2 bg-white border-2 text-center">
                            <div className="py-10 px-12">
                              <small className="text-scarpa-flow-gray-34">REMUNERATION ({budgetCurrency})</small>
                              <p className="text-alizarin-crimson-red-51 font-black mt-2 text-2xl">{formatAmount(task.budget)} </p>
                            </div>
                            <div className="py-10 px-12 border-l-2">
                              <small className="text-scarpa-flow-gray-34">DEADLINE</small>
                              <p className="font-black mt-2 text-2xl">{formatFrenchDateIntl(task.deadline).toUpperCase()}</p>
                            </div>
                        </div>

                        <div className="p-5 shadow-[5px_5px_1px_0] border border-gray-200 border-l-6 border-l-alizarin-crimson-red-51 bg-white md:mt-7 shadow-gallery-gray-93">
                          <h2>Description de la Mission</h2>
                          <p className="text-scarpa-flow-gray-34 mt-7">{task.description}</p>
                        </div>
                    </div>
                    {children}
                </div>
              </div>
            }

            {
                (!loading && !task) &&            
                
                <div className="h-(--main-height) flex w-full">
                  <div className="w-full h-max m-auto -translate-y-15">
                    <Image 
                      src={'/Assets/Empty_Desktop.svg'}
                      width={200}
                      height={200}
                      alt="empty-page"
                      className="m-auto scale-200"
                    />
                    <h1 className="text-center h-max m-auto mt-5">This task doesn't exist or has been removed!</h1>
                  </div>
                </div>
            }
        </div>
    }
    </>

  )
}

export default TaskDetails


const DeleteModale:FC<{task_id:string}> = ({task_id}) => {
  const {close} = useModalify();
  const {deleteTask} = useTasksContext();

  return (
    <div>
      <p className="text-center mt-2">Etes vous sur de vouloir supprimer cette mission?</p>
      <div className="mt-5 flex items-center justify-center gap-2">
        <Button
          textContent="Supprimer"
          className="text-white py-3 px-5 rounded-md font-semibold bg-alizarin-crimson-red-51 w-full"
          Icon={Trash2}
          onClick={()=>{
            deleteTask(task_id);
            close('delete-task')
          }}
        />
        <Button
          textContent="Annuler"
          className="py-3 px-5 rounded-md font-semibold bg-iron-gray-90 w-full"
          Icon={Trash2}
          onClick={()=> close('delete-task')}
        />
      </div>
    </div>
  )
}