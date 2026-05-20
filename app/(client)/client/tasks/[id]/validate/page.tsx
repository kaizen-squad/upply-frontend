'use client'
import EmptyImage from '@/components/shared/EmptyImage';
import { useTasksContext } from '@/components/shared/tasks/TaskProvider';
import Button from '@/components/ui/Button/Button';
import { Modale } from '@/components/ui/Modal/Modale';
import { Overlay } from '@/components/ui/Overlay/Overlay';
import Spinner from '@/components/ui/Spinner/Spinner';
import { budgetCurrency } from '@/hooks/useTasks';
import apiFetch from '@/lib/api';
import { tasksA } from '@/lib/data';
import { commissionPlateform, formatFrenchDateIntl, getInitials } from '@/lib/utils';
import { DeliverableDTO, TaskProps } from '@/types';
import { ArrowRight, BadgeCheck, Shield } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Rating from 'react-ratings-star';

const matchExtBgColor: Record<string, { bg: string; text: string }> = {
  pdf: {
    bg: '#FECACA',
    text: '#DC2626'
  },
  jpg: {
    bg: '#BFDBFE',
    text: '#2563EB'
  },
  jpeg: {
    bg: '#BFDBFE',
    text: '#2563EB'
  },
  png: {
    bg: '#BFDBFE',
    text: '#2563EB'
  },
  zip: {
    bg: '#FEF08A',
    text: '#A16207'
  },
  // Fallback par défaut
  default: {
    bg: '#E5E7EB',
    text: '#4B5563'
  }
};

// Fonction pour extraire l'extension du fichier
const getFileExtension = (fileType: string): string => {
  const extension = fileType.split('/').pop() || fileType;
  return extension.toLowerCase();
};

const page = () => {
    const [deliverable, setDeliverable] = useState<DeliverableDTO | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const {tasks:[task]} = useTasksContext<TaskProps>();
    const [isModaleOpen, setIsModaleOpen] = useState(false)

    useEffect(()=>{
        const getDeliverable = async()=> {
            try{
                const response = await apiFetch<DeliverableDTO>(`api/tasks/${task.id}/deliverable`);
                if(response.success){
                    setDeliverable(response.data);
                }
            }catch(err){
                
            }finally{
                setLoading(false)
            }  
        }
        getDeliverable();
    }, []);

    if(loading)
        return (
            <div className="h-(--main-height) flex w-full">
                <div className="h-max flex items-center gap-3 m-auto">
                    <Spinner/>
                    <p>Loading...</p>
                </div>
            </div>
        )
    else
        if(deliverable){
                const fileExtension = getFileExtension(deliverable.file.file_type);
                const fileColors = matchExtBgColor[fileExtension] || matchExtBgColor.default;

            return (
                <div className="md:py-6">
                    <h1 className="hidden md:block">Révision du Livrable</h1>
                   
                    <div className="md:hidden flex items-center gap-3 bg-white shadow-2xs border border-gray-300 rounded-sm p-4">
                        <div className="h-max p-3 rounded-full border border-gray-300 bg-gray-100 font-bold text-center text-xl">{getInitials(deliverable.prestataire.name)}</div>
                        <div>
                            <small className="text-santa-gray">Livrable soumis par</small>
                            <p className="text-scarpa-flow-gray-34 font-semibold">{deliverable.prestataire.name}</p>
                        </div>
                    </div>

                    <p className="my-2 text-scarpa-flow-gray-34 hidden md:block">Livrable soumis par <span className="font-bold">{deliverable.prestataire.name}</span></p>
                    
                    <div className="xl:grid xl:grid-cols-[65%_1fr] gap-10 mt-5">
                        <div>
                            <div className="border rounded-sm bg-white">
                                <div className="flex items-center gap-3 py-6 px-8 border-b border-b-gray-200 bg-gray-100 rounded-t-sm">
                                    <Image
                                        src={'/Assets/Container.svg'}
                                        alt="container"
                                        height={20}
                                        width={20}
                                        loading="eager"
                                    />
                                    <p className="text-2xl font-semibold">Contenu de la Livraison</p>
                                </div>

                                <div className="py-6 px-8">
                                    <p className="text-2xl font-semibold">Description</p>
                                    <p className="text-scarpa-flow-gray-34">{deliverable.content}</p>
                                </div>

                                <div className="px-8 pb-5">
                                    <p className="text-2xl font-semibold">Fichier joint</p>
                                    <div className="p-5 border border-gray-200 mt-5">
                                        <div className="flex gap-3 items-stretch">
                                            <div style={{
                                                backgroundColor: matchExtBgColor[deliverable.file.file_type].bg, 
                                                color: matchExtBgColor[deliverable.file.file_type].text, borderColor: matchExtBgColor[deliverable.file.file_type].text}} className="p-2 font-semibold flex items-center border">{deliverable.file.file_type.toUpperCase()}</div>
                                            <div>
                                                <a title="Download file" download={true} href={`${deliverable.file.file_url}`} className="font-semibold duration-200 hover:text-alizarin-crimson-red-51">{deliverable.file.file_name}</a>
                                                <p className="text-scarpa-flow-gray-34">{deliverable.file.file_size} • Envoyé le <span>{formatFrenchDateIntl(deliverable.created_at)}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border p-5 w-full text-center bg-white my-5">
                                <div className="m-auto my-5">
                                    <BadgeCheck width={50} height={50} className="text-green-600 m-auto"/>
                                    <h1 className="mt-10">Prêt pour la validation</h1>
                                    <p className="my-5 text-scarpa-flow-gray-34 lg:w-[60%] w-[80%] m-auto">En validant ce livrable, vous confirmez que le travail correspond à vos attentes. Les fonds seront automatiquement libérés vers le prestataire.</p>
                                    <Button
                                        textContent="Valider et libérer les fonds"
                                        Icon={ArrowRight}
                                        Iposition="right"
                                        className="bg-alizarin-crimson-red-51 py-4 px-7 mt-8 text-white m-auto"
                                        onClick={()=> setIsModaleOpen(true)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="border border-gray-300 shadow-2xs rounded-sm pb-5">
                                <h3 className="p-5 border-b border-b-gray-300 bg-gray-100 rounded-t-sm text-scarpa-flow-gray-34">RECAPITULATIF FINANCIER</h3>
                                <div className="px-4">
                                    <div className="flex items-center justify-between pb-3 my-3 border-b border-b-gray-300 lg:border-none">
                                        <span className="text-scarpa-flow-gray-34">Montant du contrat</span>
                                        <span>{tasksA[0].budget} {budgetCurrency}</span>
                                    </div>
                                    <div className="flex items-center justify-between pb-3 my-3 border-b border-b-gray-300 lg:border-none">
                                        <span className="text-scarpa-flow-gray-34">Commission de service</span>
                                        <span className="text-alizarin-crimson-red-51 lg:text-black">- {commissionPlateform(tasksA[0].budget)} {budgetCurrency}</span>
                                    </div>
                                </div>
                                <hr className="mx-4 border-gray-300 my-5 hidden lg:block" />
                                <div className="flex items-center justify-between px-4">
                                    <p className="text-2xl font-bold">Total Net</p>
                                    <p className="font-bold text-alizarin-crimson-red-51 text-2xl">{(tasksA[0].budget - commissionPlateform(tasksA[0].budget))} {budgetCurrency}</p>
                                </div>
                            </div>

                            <div className="border border-gray-300 shadow-2xs rounded-sm pb-5 my-5">
                                <h3 className="p-5 border-b border-b-gray-300 bg-gray-100 rounded-t-sm text-scarpa-flow-gray-34">A PROPOS DU PRESTATAIRE</h3>
                                <div>
                                    <div className="items-center gap-2 mt-5 ml-5 hidden md:flex">
                                        <div className="h-max p-2 px-3 rounded-xs border border-gray-300 bg-gray-100 font-bold text-center text-xl">{getInitials(deliverable.prestataire.name)}</div>
                                        <p className="text-scarpa-flow-gray-34 font-semibold">{deliverable.prestataire.name}</p>
                                    </div>

                                    <div className="rounded-xs border border-gray-300 mt-5 mx-5 p-5 py-2 pb-3 bg-gray-50">
                                        <small className="text-scarpa-flow-gray-34 font-bold">NOTE GLOBALE</small>
                                        <div className="flex items-center justify-between mt-2 ">
                                            <Rating
                                                value={deliverable.prestataire.rating_avg}
                                                size={25}
                                                fullColor="var(--yellow)"  
                                                isSelectable={false}
                                            />
                                            <p> <span className="text-xl font-bold">{deliverable.prestataire.rating_avg}</span> <span className="text-scarpa-flow-gray-34">/5</span></p>   
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-white-solid mt-5 p-5 bg-woodsmoke-gray-8 rounded-sm border border-gray-300 shadow-2xs">
                                <div className="flex items-center gap-2">
                                    <Shield stroke="var(--alizarin-crimson-red-51)" height={25} width={25} />
                                    <span className="font-semibold">GARANTIE UPPLY</span>
                                </div>
                                <p className="mt-3">Vos fonds sont actuellement sécurisés en séquestre. En validant ce livrable, vous autorisez la <strong>Libération immédiate des fonds</strong> vers le prestataire via notre partenaire financier FedaPay.</p>
                            </div>
                        </div>

                    </div>

                    {
                        isModaleOpen &&
                        <Overlay isOpen={isModaleOpen} onClose={()=> setIsModaleOpen(false)}>
                            <Modale isOpen={isModaleOpen} className="text-center" onClose={()=> setIsModaleOpen(false)}>
                                <p>Veuillez confirmer votre action</p>
                                <div className="mt-5 flex items-center justify-center gap-7 font-semibold text-white">
                                    <Button
                                        textContent="Valider"
                                        className="py-3 px-6 rounded-sm font-semibold bg-alizarin-crimson-red-51" 
                                    />
                                    <Button
                                        textContent="Annuler"
                                        className="py-3 px-6 rounded-sm font-semibold bg-santa-gray"
                                        onClick={()=>setIsModaleOpen(false)}
                                    />
                                </div>
                            </Modale>
                        </Overlay> 
                    }
                    
                </div>
            )
        }
        else 
            return (
                // Error state : API return error (Show a global error state component)
                <div className="h-full w-full flex">
                    <div className="w-max h-max m-auto -translate-y-10">
                        <EmptyImage/>
                        <p className="text-2xl font-bold text-center relative z-1">Aucun livrable disponible!</p>
                    </div>
                </div>
            )
}

export default page


