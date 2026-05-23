'use client'
import FlagTask from "@/components/shared/tasks/FlagTask";
import { formatAmount, formatFrenchDateIntl, formatRelativeTime } from "@/lib/utils";
import Image from "next/image";
import ApplicationForm from "@/components/dashboard/prestataire/ApplicationForm";
import Spinner from "@/components/ui/Spinner/Spinner";
import { TaskProps } from '@/types/index';
import { useTasksContext } from "@/components/shared/tasks/TaskProvider";
import TaskDetails from "@/components/shared/tasks/TaskDetails";

const page = () => {
    const {tasks: [task], refetch, loading} = useTasksContext<TaskProps>();

  return (       
     <>     
      <TaskDetails role="prestataire" loading={loading} task={task} >
        <div className="flex flex-col gap-7">
           <ApplicationForm task={task} />
           <div className="bg-woodsmoke-gray-10 p-5">
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
      </TaskDetails>
    </>
  ) 
}

export default page