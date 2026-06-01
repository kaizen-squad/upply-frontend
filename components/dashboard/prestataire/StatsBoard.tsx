import { budgetCurrency } from "@/hooks/useTasks";
import { cn, formatAmount } from "@/lib/utils";
import { PDashboardData } from "@/types";
import { FC } from "react";
import FlagApplication from "./FlagApplication";
import FlagTask from "@/components/shared/tasks/FlagTask";


const StatsBoard:FC<{dashboardData: PDashboardData}> = ({dashboardData}) => {
  return (
    <div className="grid grid-rows-2 grid-cols-2 gap-4 lg:flex lg:flex-row lg:gap-5 my-7 w-full items-stretch">
        {
            [
                {title: 'GAINS EN ATTENTE', text: `${formatAmount(dashboardData?.statistics?.waiting_budget) ?? 0} ${budgetCurrency}` , textColor: 'var(--alizarin-crimson-red-51)', Flag: undefined}, 
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
  )
}

export default StatsBoard