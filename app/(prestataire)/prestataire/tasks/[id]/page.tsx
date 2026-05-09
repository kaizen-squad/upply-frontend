'use client'
import FlagTask from "@/components/shared/tasks/FlagTask";
import { formatFrenchDateIntl, formatRelativeTime } from "@/lib/utils";
import Image from "next/image";
import ApplicationForm from "@/components/dashboard/prestataire/ApplicationForm";
import Spinner from "@/components/ui/Spinner/Spinner";
import { ApplicationResponse } from '@/types/index';
import { useTasksContext } from "@/components/shared/tasks/TaskProvider";

const page = () => {
    const {tasks: [task], refetch, loading} = useTasksContext<ApplicationResponse>();

  return (       
     <>     
     {/* Chargement */}
        {  
        loading ? 
          <div className=" h-(--main-height) w-full flex">
              <div className="flex items-center gap-2 h-max m-auto">
                <Spinner/> 
                <p>Loading...</p>
              </div>
          </div>
          :
          <div className="py-10">
            {/* Lorsque c'est ok */}
            {
              (!loading && task) &&
              <div>

                <div className="hidden md:block">
                  <FlagTask status={task.status} />
                  <h1 className="mt-3">{task.title}</h1>
                  <p className="my-2 text-scarpa-flow-gray-34">{formatRelativeTime(task.created_at ?? '')}</p>
                </div>

                <div className="block bg-white md:hidden p-5 border border-gray-200 shadow-2xs rounded-sm">
                  <div className="flex justify-between items-center">
                    <FlagTask status={task.status} />
                    <div className="w-max text-right">
                      <small className="text-scarpa-flow-gray-34 font-semibold">BUDGET</small>
                      <p className="text-alizarin-crimson-red-51 font-black text-2xl">{task.budget}</p>
                    </div>
                  </div>
                  
                  <h1 className="my-3">{task.title}</h1>
                  <hr className="border border-gray-100 my-6" />

                  <small className="text-scarpa-flow-gray-34 font-semibold">DATE LIMITE</small>
                  <div className="flex items-center gap-1 mt-1p">
                    <Image
                      width={15}
                      height={15}
                      alt="deadline-icon"
                      src={'/Assets/Deadline_Icon.svg'}
                    />
                    <p>{formatFrenchDateIntl(task.deadline)}</p>
                  </div>
                </div>
                

                <div className="mt-7 grid xl:grid-cols-[60%_38%] lg:gap-[2%] gap-7">
                  {/* A gauche */}
                    <div>
                        <div className="hidden md:grid grid-cols-2 bg-white border-2 text-center">
                            <div className="py-10 px-12">
                              <small className="text-scarpa-flow-gray-34">REMUNERATION</small>
                              <p className="text-alizarin-crimson-red-51 font-black mt-2 text-2xl">{task.budget}</p>
                            </div>
                            <div className="py-10 px-12 border-l-2">
                              <small className="text-scarpa-flow-gray-34">DEADLINE</small>
                              <p className="font-black mt-2 text-2xl">{formatFrenchDateIntl(task.deadline).toUpperCase()}</p>
                            </div>
                        </div>

                        <div className="p-5 shadow-[5px_5px_1px_0] border border-gray-200 border-l-6 border-l-alizarin-crimson-red-51 bg-white md:mt-10 shadow-gallery-gray-93">
                          <h2>Description de la Mission</h2>
                          <p className="text-scarpa-flow-gray-34 mt-10">{task.description}</p>
                        </div>

                    </div>

                  {/* A droite */}
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
                </div>
              </div>
            }

            {/* Lorsqu'il y a une erreur */}
            
            { 
              !task?.id &&
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

export default page