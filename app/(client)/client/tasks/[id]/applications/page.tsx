'use client'
import ApplicationCard from "@/components/dashboard/client/ApplicationCard";
import { useTasksContext } from "@/components/shared/tasks/TaskProvider";
import Spinner from "@/components/ui/Spinner/Spinner";
import { budgetCurrency, useApplication } from "@/hooks/useTasks";
import { formatRelativeTime } from "@/lib/utils";
import { TaskPropsOnPrestataire } from "@/types";
import Image from "next/image";
import { useEffect } from "react";
import { formatFrenchDateIntl } from '@/lib/utils';
import FlagTask from "@/components/shared/tasks/FlagTask";
import { applicationsMock, tasksA } from "@/lib/data";
import { ModalifyExample } from "@/components/examples/ModalifyExample";

const page = () => {
    const {loading, application, getApplication} = useApplication();
    const {tasks: [task]} = useTasksContext<TaskPropsOnPrestataire>();

    useEffect(()=>{
      getApplication('1');
    }, [task?.id]);

    if(loading) 
      return (
        <div className="h-(--main-height) w-full flex">
            <div className="flex items-center gap-2 h-max m-auto">
                <Spinner/>
                <p>Loading...</p>
            </div>
        </div>
    );
    return (
      <div>
        <div className="mt-5 mb-3">
          <FlagTask status={tasksA[0]?.status}/>
        </div>
        <h1>{tasksA[0]?.title}</h1>
        <p className="text-scarpa-flow-gray-34 mt-4">{formatRelativeTime(tasksA[0]?.created_at ?? '')}</p>

        <div className="grid lg:grid-cols-[65%_1fr] gap-10 my-5">
          <div className="flex flex-col gap-5">
            {
              applicationsMock.map((app, index) => <ApplicationCard application={app} key={index} />)
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
                    <p className="font-bold text-xl text-alizarin-crimson-red-51 text-right">{tasksA[0].budget} {budgetCurrency}</p>
                 </div>
                 <div className="xl:flex flex-wrap xl:gap-5 items-center justify-between border-b border-b-gray-200 pb-5 mt-4">
                    <p className="font-semibold text-scarpa-flow-gray-34">Date Limite</p>
                    <p className="font-bold text-right">{formatFrenchDateIntl(tasksA[0].deadline ?? '')}</p>
                 </div>
                 <div className="xl:flex flex-wrap xl:gap-5 items-center justify-between pb-5 mt-4 text-scarpa-flow-gray-34 w-full">
                    <p className="font-semibold text-scarpa-flow-gray-34">Statut</p>
                    <div className="flex justify-end w-full">
                         <FlagTask status={tasksA[0].status} />
                    </div>
                 </div>
               </div>
            </div>
        </div>
      </div>
    )
}

export default page