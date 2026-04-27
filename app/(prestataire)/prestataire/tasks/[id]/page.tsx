'use client'
import FlagTask from "@/components/tasks/FlagTask";
import { useTasks } from "@/hooks/useTasks";
import { formatFrenchDateIntl, formatRelativeTime } from "@/lib/utils";
import Image from "next/image";
import { useEffect } from "react";
import { TaskStatus } from '../../../../../types/index';
import ApplicationForm from "@/components/dashboard/prestataire/ApplicationForm";

const page: React.FC<{params:Promise<{id:string}>}> = ({params}) => {
    const {tasks:[task], refetch, loading} = useTasks(undefined, true);
    // {task_id: '1', status: 'OUVERTE' , title:'Supervision de Livraison Shein', created_at:'2026-05-032025-04-26T10:00:00Z', budget:'25,000 FCFA', description:"Nous recherchons un superviseur de terrain pour coordonner la réception et la redistribution de 15 colis prioritaires au point de relais de Grand Yoff.\n\n Vos responsabilités incluent :\n\n Vérification de l'intégrité des scellés à l'arrivée du camion.", deadline:'2026-05-03'}
    useEffect(()=>{
      const getTask = async()=> {
        const {id}= await params;
        refetch(id)
      }
      getTask();
    }, [params]);

  return (
    <div>
        {/* While loading */}
        {
          loading && 
          <div>
              
          </div>
        }
        {
          (loading && task) &&
          <div>
            <FlagTask status={task.status} />

            <h1 className="mt-3">{task.title}</h1>
            <p className="my-2 text-scarpa-flow-gray-34">{formatRelativeTime(task.created_at ?? '')}</p>

            <div className="mt-10 grid xl:grid-cols-[60%_38%] gap-[2%]">
              {/* left */}
                <div>
                    <div className="grid grid-cols-2 bg-white border-2 text-center">
                        <div className="py-10 px-12">
                           <small className="text-scarpa-flow-gray-34">REMUNERATION</small>
                           <p className="text-alizarin-crimson-red-51 font-black mt-2 text-2xl">{task.budget}</p>
                        </div>
                        <div className="py-10 px-12 border-l-2">
                          <small className="text-scarpa-flow-gray-34">DEADLINE</small>
                          <p className="font-black mt-2 text-2xl">{formatFrenchDateIntl(task.deadline).toUpperCase()}</p>
                        </div>
                    </div>

                    <div className="p-5 shadow-[5px_5px_1px_0] border border-gray-200 border-l-6 border-l-alizarin-crimson-red-51 bg-white mt-20 shadow-gallery-gray-93">
                       <h2>Description de la Mission</h2>
                       <p className="text-scarpa-flow-gray-34 mt-10">{task.description}</p>
                    </div>

                </div>

              {/* Right */}
                <div className="flex flex-col gap-7">
                  <ApplicationForm task_id={task.id} />
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
            </div>
          </div>
        }
    </div>
  )
}

export default page