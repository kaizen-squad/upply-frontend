'use client'
import ApplicationCard from "@/components/dashboard/prestataire/ApplicationCard"
import FlagApplication from "@/components/dashboard/prestataire/FlagApplication"
import TaskCard from "@/components/dashboard/prestataire/TaskCard"
import FlagTask from "@/components/shared/tasks/FlagTask"
import Button from "@/components/ui/Button/Button"
import Spinner from "@/components/ui/Spinner/Spinner"
import { useDashboard } from "@/hooks/useDashboard";
import { budgetCurrency } from "@/hooks/useTasks"
import { cn } from "@/lib/utils"
import {  PDashboardData } from "@/types"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect } from "react"


const page = () => {
    const { dashboardData, loading, loadDashboard } =  useDashboard<PDashboardData>('prestataire');
  const router = useRouter();
    useEffect(()=>{
        loadDashboard();
    }, []);
    
    if(loading)
        return (
            <div className="flex gap-2 m-auto h-max items-center">
                <Spinner/>
                <p>Loading...</p>
            </div> 
        )

    if(!dashboardData)
        return (
            <div className="flex gap-2 m-auto h-max items-center text-center">
                <h1>Une erreur de chargement est survenue.</h1>
            </div>
        )
    return (
        <div className="flex w-full h-full min-h-(--main-height)">
            <div className="my-10 w-full">  
                <div>
                    <h1>Mon Tableau de Bord</h1>
                    <div className="grid grid-rows-2 grid-cols-2 gap-4 lg:flex lg:flex-row lg:gap-5 my-7 w-full items-stretch">
                        {
                            [
                                {title: 'GAINS EN ATTENTE', text: `${dashboardData?.statistics?.waiting_budget ?? 0} ${budgetCurrency}` , textColor: 'var(--alizarin-crimson-red-51)', Flag: undefined}, 
                                {title: 'CANDIDATURES', text: `${dashboardData?.statistics?.waiting_applications ?? 0}`, textColor: 'var(--alizarin-crimson-red-51)', Flag: ()=> <FlagApplication status="EN_ATTENTE" />},
                                {title: 'MISSIONS ACTIVES', text: `${dashboardData?.statistics?.active_missions ?? 0}`, textColor: 'var(--alizarin-crimson-red-51)', Flag: ()=> <FlagTask status="EN_COURS" />},
                            ].map(({title, text, textColor, Flag}, index)=> 
                                <div 
                                    className={cn(
                                        "flex flex-col gap-2 justify-between border border-gray-200 md:rounded-sm md:border-black shadow-2xs p-5 bg-white-solid lg:flex-1 rounded-lg",
                                        index === 0 && 'col-span-2',
                                        index === 1 && 'row-start-2 col-start-1 col-end-2',
                                        index === 2 && 'row-start-2 col-start-2 col-end-3'
                                    )} 
                                    key={`${title}-${index}`}
                                >
                                    <div className="flex items-center justify-between flex-wrap gap-1">
                                        <small className="text-scarpa-flow-gray-34 font-semibold">{title}</small>
                                        {Flag && <div className="hidden xs:block md:hidden xl:block"><Flag/></div>}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-3xl font-bold" style={{color:textColor}}>{text}</p>
                                        {Flag && <div className="block xs:hidden md:block xl:hidden"><Flag/></div>}
                                    </div>
                                </div>
                            ) 
                        }
                    </div>

                    <div className="grid lg:grid-cols-[65%_1fr] gap-5">
                        {/* Left */}
                        <div>
                            <h2>Missions en cours</h2>
                            {
                                dashboardData?.tasks.length ?
                                <div className="mt-7">
                                    {dashboardData?.tasks.map((task)=>
                                        <TaskCard key={task.id} task={task} />
                                    )}
                                </div>
                                :
                                <div className="mt-7 border shadow-2xs bg-white-solid py-12 text-center rounded-sm">
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
                                        onClick={()=> router.push('/prestataire/tasks')}
                                    />
                                </div>
                            }     
                        </div>

                        {/* Right */}
                        <div className="w-full">
                            <h2>Dernières applications</h2>

                            <div className="flex flex-col gap-3 mt-7">
                                {   dashboardData?.applications.length ? 
                                        dashboardData?.applications.slice(0,3).map((application, index)=> <ApplicationCard key={index} application={application} />)
                                    :
                                        <div className="text-center py-5 bg-white border shadow-2xs">
                                            Aucune candidature
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page