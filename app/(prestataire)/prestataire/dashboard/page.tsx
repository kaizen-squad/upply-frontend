'use client'
import ApplicationCard from "@/components/dashboard/prestataire/ApplicationCard"
import FlagApplication from "@/components/dashboard/prestataire/FlagApplication"
import StarterMissions from "@/components/dashboard/prestataire/StarterMissions";
import StatsBoard from "@/components/dashboard/prestataire/StatsBoard";
import TaskCard from "@/components/dashboard/prestataire/TaskCard"
import FlagTask from "@/components/shared/tasks/FlagTask"
import Button from "@/components/ui/Button/Button"
import MenuListComposition from "@/components/ui/Menu/Menu";
import Spinner from "@/components/ui/Spinner/Spinner"
import { useDashboard } from "@/hooks/useDashboard";
import { budgetCurrency } from "@/hooks/useTasks"
import { cn, formatAmount } from "@/lib/utils"
import {  PDashboardData } from "@/types"
import { ArrowRight } from "lucide-react"
import { ST } from "next/dist/shared/lib/utils";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react"


const page = () => {
    const { dashboardData, loading, loadDashboard } =  useDashboard<PDashboardData>('prestataire');
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState('ALL');

    const filterOptions = [ 
        { label: 'Toutes les missions', key: 'ALL' },
        { label: 'En cours', key: 'EN_COURS' },
        { label: 'Livrées', key: 'LIVREE' },
        { label: 'Terminées', key: 'VALIDEE' }
    ];
    useEffect(()=>{
        loadDashboard();
    }, []);

    const tasksFiltered = useMemo(()=>{
        if (activeFilter === 'ALL') {
            return dashboardData?.tasks || [];
        }
        return dashboardData?.tasks.filter(({status})=> status === activeFilter) || [];
    }, [dashboardData, activeFilter]) 
    
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
                    <StatsBoard dashboardData={dashboardData} />
                    
                    <div className="grid lg:grid-cols-[65%_1fr] gap-5">
                        {/* Left */}
                        <div>
                            <div className="flex items-center justify-between">
                                <h2>{activeFilter === 'ALL' ? 'Toutes les missions' : `Missions ${filterOptions.find(opt => opt.key === activeFilter)?.label.toLowerCase()}`}</h2>
                                <MenuListComposition
                                    items={filterOptions}
                                    activeFilter={activeFilter}
                                    setActiveFilter={setActiveFilter}
                                />
                            </div>
                                     
                            {
                                dashboardData?.tasks.length ?
                                <div className="mt-">
                                    {
                                        tasksFiltered.length === 0 ?
                                            <p className="p-10 text-center w-full bg-white-solid shadow-2xs rounded-sm border-gray-300 border my-5">Aucune mission trouvée.</p> 
                                            :
                                            tasksFiltered.map((task)=>
                                                <TaskCard key={task.id} task={task} />
                                            )
                                    }
                                </div>
                                :
                                <StarterMissions/>
                            }     
                        </div>

                        {/* Right */}
                        <div className="w-full">
                            <h2>Dernières applications</h2>

                            <div className="flex flex-col gap-3 mt-8">
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