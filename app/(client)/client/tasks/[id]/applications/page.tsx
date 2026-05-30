'use client'
import ApplicationCard from "@/components/dashboard/client/ApplicationCard";
import { useTasksContext } from "@/components/shared/tasks/TaskProvider";
import Spinner from "@/components/ui/Spinner/Spinner";
import { budgetCurrency } from "@/hooks/useTasks";
import { formatAmount, formatRelativeTime } from "@/lib/utils";
import Image from "next/image";
import { useEffect } from "react";
import { formatFrenchDateIntl } from '@/lib/utils';
import FlagTask from "@/components/shared/tasks/FlagTask";
import EmptyImage from "@/components/shared/EmptyImage";
import { useApplication } from "@/hooks/useApplication";
import Button from "@/components/ui/Button/Button";
import { Redo2 } from "lucide-react";
import { notFound, useRouter } from "next/navigation";

const page = () => {
    const {loading, application, getTaskApplication} = useApplication();
    const {tasks: [task]} = useTasksContext();
    const router = useRouter();

    useEffect(()=>{
      
      if(task && task.id)
        if(task.status !== 'OUVERTE'){          
            notFound();
        }else
          getTaskApplication(task.id, 'client');
    }, [task]);

    if(loading) 
      return (
        <div className="flex items-center gap-2 h-max m-auto">
            <Spinner/>
            <p>Loading...</p>
        </div>
    );
    if(Boolean(application.length))
      return (
        <div>
          <div className="mt-5 mb-3">
            <FlagTask status={task?.status}/>
          </div>
          <h1>{task.title}</h1>
          <p className="text-scarpa-flow-gray-34 mt-4">{formatRelativeTime(task?.created_at ?? '')}</p>

          <div className="grid lg:grid-cols-[65%_1fr] gap-10 my-5">
            <div className="flex flex-col gap-5">
              {
                application.map((app, index) => <ApplicationCard application={app} key={index} />)
              }
            </div>
              <div className="flex flex-col gap-10">
                <div className="bg-woodsmoke-gray-8 p-5 rounded-sm shadow-2xs">
                    <div className="flex items-center gap-2 font-bold text-white-solid">
                      <Image 
                        src={'/Assets/Idea.svg'}
                        alt="Idea"
                        width={20}
                        height={20}
                      />
                      <span>CONSEIL CLIENT</span>
                    </div>
                    <p className="text-gallery-gray-93 mt-5">Comparez les notes et les expériences passées des candidats. Un candidat avec une expérience spécifique dans l'e-commerce garantira souvent de meilleurs résultats pour cette mission.</p>
                </div>

                <div className="p-5 bg-white-solid rounded-sm border border-gray-200 shadow-2xs border-l-5 border-l-alizarin-crimson-red-51">
                  <p className="font-semibold">RECAPITULATIF</p>
                  <div className="xl:flex items-center flex-wrap xl:gap-5 justify-between border-b border-b-gray-200 pb-5 mt-4 ">
                      <p className="font-semibold text-scarpa-flow-gray-34">Budget</p>
                      <p className="font-bold text-xl text-alizarin-crimson-red-51 text-right">{formatAmount(task.budget)} {budgetCurrency}</p>
                  </div>
                  <div className="xl:flex flex-wrap xl:gap-5 items-center justify-between border-b border-b-gray-200 pb-5 mt-4">
                      <p className="font-semibold text-scarpa-flow-gray-34">Date Limite</p>
                      <p className="font-bold text-right">{formatFrenchDateIntl(task.deadline ?? '')}</p>
                  </div>
                  <div className="xl:flex flex-wrap xl:gap-5 items-center justify-between pb-5 mt-4 text-scarpa-flow-gray-34 w-full">
                      <p className="font-semibold text-scarpa-flow-gray-34">Statut</p>
                      <div className="flex justify-end w-full xl:w-max">
                          <FlagTask status={task.status} />
                      </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      )
    if(!Boolean(application.length))
      return (
        <div className="h-max m-auto translate-y-15">
          <div className="-translate-y-20">
            <EmptyImage/>
            <p className="text-xl font-bold relative z-1 text-center">Aucune candidature n'a été soumise.</p>
          </div>
          <Button
            textContent="Retourner"
            className="bg-alizarin-crimson-red-51 text-white font-semibold rounded-md py-3 px-8 m-auto -translate-y-15 w-[95%] sm:w-max"
            Icon={()=><Redo2 className="rotate-y-180" />}
            Iposition="left"
            onClick={()=> router.back()}
          />
        </div>
      )
}

export default page