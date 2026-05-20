'use client'
import Script from 'next/script';
import { useTasksContext } from '@/components/shared/tasks/TaskProvider';
import { budgetCurrency } from '@/hooks/useTasks';
import apiFetch from '@/lib/api';
import { commissionPlateform, formatAmount, getInitials } from '@/lib/utils';
import { PrestataireSelectedData } from '@/types';
import { useEffect, useState }  from 'react'
import { tasksA } from '../../../../../../lib/data';
import  Milestone  from '@/components/ui/Milestone/Milestone';
import Button from '@/components/ui/Button/Button';
import { useModalify } from '@/components/ui/Modal/hooks/useModalify';
import Fedapay from '@/components/dashboard/client/payment/Fedapay';

const page = () => {
    const {tasks: []} = useTasksContext();
    const task = tasksA[0];
    const [prestataire, setPrestataire] = useState<PrestataireSelectedData | null>(null);
    const [loading, setLoading] = useState(true);
    const {modalify} = useModalify();

    useEffect(()=>{
        const getPrestataire = async ()=>{
            try{
                const response = await apiFetch<PrestataireSelectedData | null>('/api/applications');
                setPrestataire(response.data);
            }catch(err){
                console.error('Error fetching prestataire:', err);
            }finally{
                setLoading(false);
        }
        }
        getPrestataire();
    }, [])

    if(loading) {
        return (
            <div className="h-(--main-height) w-full flex">
                <div className="flex items-center gap-2 h-max m-auto">
                    <p>Loading prestataire details...</p>
                </div>
            </div>
        );
    }
    if(!prestataire) {
        return (
            <div className="h-(--main-height) w-full flex">
                <div className="flex items-center gap-2 h-max m-auto">
                    <h1>No prestataire details found.</h1>
                </div>
            </div>
        );
    }
    return (
        <div>
            <Script src="https://cdn.fedapay.com/checkout.js?v=1.1.7" strategy="afterInteractive" />
            <h1>Escrow Paiement</h1>
            <div className="my-10 flex flex-col xl:grid grid-cols-[1fr_1fr] gap-7">
                <div className="bg-white-solid rounded-md p-10 border">
                    <div className="flex items-center gap-3">
                        <p className="p-3 rounded-full bg-alizarin-crimson-red-51 text-white-solid font-semibold">{getInitials(prestataire.prestataire_name)}</p>
                        <div>
                            <p className="font-semibold">{prestataire.prestataire_name}</p>
                            <p className="text-jumbo-gray-46">Prestataire sélectionné</p>
                        </div>
                    </div>
                    <hr className="border border-gray-200 w-full my-5" />

                    <p className="text-3xl font-bold my-5">Récapitulatif de la Mission & du Montant</p>

                    <div className="my-5 rounded-md">
                        <div className="flex items-center justify-between my-3 gap-5">
                            <p className="min-w-max text-santa-gray">Titre de la mission</p>
                            <strong className="line-clamp-1">{task.title}</strong>
                        </div>
                        <div className="flex items-center justify-between my-3 gap-5">
                            <p className="min-w-max text-santa-gray">Date Limite</p>
                            <strong>{task.deadline}</strong>
                        </div>
                        <div className="flex items-center justify-between my-3 gap-5">
                            <p className="min-w-max text-santa-gray">Budget de la mission</p>
                            <strong className="text-alizarin-crimson-red-51">{formatAmount(task.budget)} {budgetCurrency}</strong>
                        </div>
                    </div>

                    <div className="my-5 p-5 rounded-md bg-athens-gray-96">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-scarpa-flow-gray-34">Montant mission</p>
                            <strong>{formatAmount(task.budget)} {budgetCurrency}</strong>
                        </div>
                        <div className="flex items-center justify-between my-3">
                            <p className="text-scarpa-flow-gray-34">Frais de service</p>
                            <strong>{formatAmount(commissionPlateform(task.budget))} {budgetCurrency}</strong>
                        </div>
                        <hr className="border border-gray-200 w-full my-3" />
                        <div className="flex items-center justify-between">
                            <p className="text-scarpa-flow-gray-34">Total à déposer</p>
                            <strong>{formatAmount(task.budget + commissionPlateform(task.budget))} {budgetCurrency}</strong>
                        </div>
                    </div>

                    <div className="rounded-md p-5 bg-yellow-fade border border-yellow my-5">
                        <p><strong className="text-scarpa-flow-gray-34">Sécurité Escrow:</strong> Votre budget sera bloqué en toute sécurité dans notre système de séquestre. Le prestataire ne recevra le paiement qu'après validation complète de la mission.</p>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-md border">
                    <div className="md:flex items-center gap-5 justify-between">
                        <p className="font-bold text-3xl">Plateforme Fedapay sécurisée</p>
                        <p className="h-max py-1 px-3 bg-woodsmoke-gray-8 rounded-md text-white font-semibold">Fedapay</p>
                    </div>
                    <div className="my-10">
                        
                    </div>
                    <div className="rounded-md p-5 bg-gallery-gray-93 mt-5">
                        <p className="font-semibold">Méthodes de paiement acceptés</p>
                        <ul className="mt-3">
                            <li className="my-2 before:content-['•'] flex items-center gap-2 before:scale-150 text-scarpa-flow-gray-34">Mobile Money (MTN, Moov, Orange)</li>
                            <li className="my-2 before:content-['•'] flex items-center gap-2 before:scale-150 text-scarpa-flow-gray-34">Cartes bancaires</li>
                            <li className="my-2 before:content-['•'] flex items-center gap-2 before:scale-150 text-scarpa-flow-gray-34">Virement bancaires</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div>
                <div className="grid grid-cols-[33%_1fr] gap-5 mt-5 items-end">
                    <div className="rounded-md pt-5 px-5 bg-gallery-gray-93 border">
                        <p className="text-xl font-semibold mb-2">Prochaines Etapes</p>
                        <Milestone/>
                    </div>

                    <div className="grid grid-cols-2 gap-5 h-max">
                        <div className="rounded-md p-5 bg-white-solid border gap-2">
                            <p className="font-semibold text-xl">Securité Escrow</p>
                            <p className="text-scarpa-flow-gray-34 mt-3">Votre budget est bloqué en toute sécurité dans notre système de séquestre. Le prestataire ne pourra accéder aux fonds qu'après votre validation finale du travail accompli.</p>
                        </div>

                        <div className="rounded-md p-5 border flex flex-col justify-between">
                            <div>
                                <p className="text-xl font-semibold">Besoin d'aide?</p>
                                <p className="text-jumbo-gray-46 mt-3">Notre équipe de support est disponible 24/7 pour vous aider.</p>
                            </div>                            
                            <Button
                                textContent="Contacter le support"
                                className="font-bold text-white-solid w-full mt-3 rounded-md bg-woodsmoke-gray-8 py-3"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default page