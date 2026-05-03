'use client'
import ApplicationCard from "@/components/dashboard/prestataire/ApplicationCard"
import FlagApplication from "@/components/dashboard/prestataire/FlagApplication"
import TaskCard from "@/components/dashboard/prestataire/TaskCard"
import FlagTask from "@/components/shared/tasks/FlagTask"
import Button from "@/components/ui/Button/Button"
import useNotificationManager from "@/components/ui/Notification/hooks/useNotificationManager"
import Spinner from "@/components/ui/Spinner/Spinner"
import { budgetCurrency } from "@/hooks/useTasks"
import apiFetch from "@/lib/api"
import { tasksA } from "@/lib/data"
import { cn } from "@/lib/utils"
import { PDashboardData } from "@/types"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"


const page = () => {
    const tasks = tasksA;
    const [dashboardData, setDashboardData] = useState<PDashboardData | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const {notify} = useNotificationManager();
    useEffect(()=>{
        const loadDashboard = async ()=> {
            try{
                setLoading(true);
                const response = await apiFetch<PDashboardData>('api/dashboard/prestataire');
                if(response.success){
                    setDashboardData(response.data)
                }else throw new Error(response.message)
            }catch(err){
                // notify(err instanceof Error ? err.message : 'Une erreur est survenue lors du chargement!', 'error')
            }finally{
                setLoading(false);
            }
        }

        loadDashboard();
    }, [])

  return (
    <div className="flex w-full h-full min-h-(--main-height)">
        {
            !loading ?
            <div className="my-10 w-full">  
                <div>
                    <h1>Mon Tableau de Bord</h1>
                    <div className="grid grid-rows-2 grid-cols-2 gap-4 lg:flex lg:flex-row lg:gap-7 my-7 w-full items-stretch">
                        {
                            [
                                {title: 'GAINS EN ATTENTE', text: `${dashboardData?.statistics.waiting_budget ?? 0} ${budgetCurrency}` , textColor: 'var(--alizarin-crimson-red-51)', Flag: undefined}, 
                                {title: 'CANDIDATURES', text: `${dashboardData?.statistics.waiting_applications ?? 0}`, textColor: 'var(--alizarin-crimson-red-51)', Flag: ()=> <FlagApplication status="EN_ATTENTE" />},
                                {title: 'MISSIONS ACTIVES', text: `${dashboardData?.statistics.active_missions ?? 0}`, textColor: 'var(--alizarin-crimson-red-51)', Flag: ()=> <FlagTask status="EN_COURS" />},
                            ].map(({title, text, textColor, Flag}, index)=> 
                                <div 
                                    className={cn(
                                        "flex flex-col justify-between md:border shadow-2xs p-5 bg-white-solid lg:flex-1",
                                        index === 0 && 'col-span-2',
                                        index === 1 && 'row-start-2 col-start-1 col-end-2',
                                        index === 2 && 'row-start-2 col-start-2 col-end-3'
                                    )} 
                                    key={`${title}-${index}`}
                                >
                                    <div className="flex-row md:flex-col xl:flex-row flex xl:items-center justify-between">
                                        <small className="text-scarpa-flow-gray-34 font-semibold">{title}</small>
                                        {Flag && <Flag/>}
                                    </div>
                                    <p className="text-3xl mt-5 font-bold" style={{color:textColor}}>{text}</p>
                                </div>
                            ) 
                        }
                    </div>

                    <div className="grid lg:grid-cols-[65%_1fr] gap-10">
                        {/* Left */}
                        <div>
                            <h2>Missions en cours</h2>
                            {
                                !dashboardData?.tasks ?
                                <div className="mt-7">
                                    {tasksA.map((task)=>
                                        <TaskCard key={task.id} task={task} />
                                    )}
                                </div>
                                :
                                <div className="mt-7 border shadow-2xs bg-white-solid py-12 text-center">
                                    <Image 
                                        src={'/Assets/Rocket.svg'}
                                        height={65}
                                        width={65}
                                        alt="rocket-icon"
                                        className="m-auto my-4 p-2 rounded-sm border border-gray-200 shadow-2xs"
                                    />
                                    <p className="text-2xl font-bold">Aucune tache active ?</p>
                                    <p className="text-scarpa-flow-gray-34 mt-1 mx-auto w-[60%]">Lancer votre première candidature ou continuez a vous enrichir avec Upply.</p>
                                    <Button
                                        textContent="Decrocher un contrat"
                                        Icon={ArrowRight}
                                        Iposition="right"
                                        className="bg-alizarin-crimson-red-51 py-3 text-white-solid px-6 rounded-sm m-auto mt-4"
                                    />
                                </div>
                            }
                            
                        </div>

                        {/* Right */}
                        <div className="w-full">
                            <h2>Candidatures envoyées</h2>

                            <div>
                                {   dashboardData?.applications.length ? 
                                        dashboardData?.applications.map((application)=> <ApplicationCard application={application} />)
                                    :
                                        <div className="text-center py-5 bg-white border shadow-2xs mt-7">
                                            Aucune candidature
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className="flex gap-2 m-auto h-max items-center">
               <Spinner/>
                <p>Loading...</p>
            </div> 

        }
    </div>
  )
}

export default page