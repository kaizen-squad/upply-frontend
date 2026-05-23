'use client'
import Script from 'next/script';
import { useTasksContext } from '@/components/shared/tasks/TaskProvider';
import { budgetCurrency } from '@/hooks/useTasks';
import apiFetch from '@/lib/api';
import { commissionPlateform, formatAmount, getInitials } from '@/lib/utils';
import { PrestataireSelectedData } from '@/types';
import { useEffect, useRef, useState }  from 'react'
import { tasksA } from '@/lib/data';
import  Milestone  from '@/components/ui/Milestone/Milestone';
import Button from '@/components/ui/Button/Button';
import Fedapay from '@/components/dashboard/client/payment/Fedapay';
import { useToasting } from '@/components/ui/Toast/useToasting';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UserCircle2 } from 'lucide-react';
import { usePayment } from '@/hooks/usePayment';

export type PaymentInfosType = {
    completed: boolean,
    transaction_id: string|undefined
}
const page = () => {
    const {tasks: []} = useTasksContext();
    const task = tasksA[0];
    const [prestataire, setPrestataire] = useState<PrestataireSelectedData | null>(null);
    const [loading, setLoading] = useState(true);
    const [totalPayment, setTotalPayment] = useState<number>(0);
    const [showFedapay, setShowFedapay] = useState(false);
    const [paymentInfos, setPaymentInfos] = useState<PaymentInfosType>({
        completed:false,
        transaction_id: undefined
    });
    const [error, setError] = useState('');
    const [isFedapayScriptLoaded, setIsFedapayScriptLoaded] = useState(false);
    const [isFedapayScriptError, setIsFedapayScriptError] = useState(false);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [checkoutError, setCheckoutError] = useState('');
    const checkoutTimeoutRef = useRef<number | null>(null);
    const {verifyPayment} = usePayment() ;
    const {notify} = useToasting();
    const router = useRouter();

    useEffect(()=>{
        const getPrestataire = async ()=>{
            try{
                const response = await apiFetch<PrestataireSelectedData | null>('/api/applications');
                if(response.success){
                    setPrestataire(response.data);
                    setTotalPayment((task.budget+commissionPlateform(task.budget)))                
                }else{
                    notify('Le délai de paiement est expiré. Veuillez réeffectuer la procédure de sélection.', 'error')
                }
            }catch(err){
                console.error('Error fetching prestataire:', err);
            }finally{
                setLoading(false);
            }
        }
        getPrestataire();
    }, [])

    useEffect(()=>{
        if(paymentInfos.completed && paymentInfos.transaction_id){
            verifyPayment(paymentInfos.transaction_id);
        }
    },[paymentInfos]);

    useEffect(() => {
        if (!showFedapay) {
            if (checkoutTimeoutRef.current) {
                window.clearTimeout(checkoutTimeoutRef.current);
                checkoutTimeoutRef.current = null;
            }
            setCheckoutLoading(false);
            return;
        }

        if (isFedapayScriptLoaded) {
            setCheckoutLoading(false);
            return;
        }

        setCheckoutLoading(true);
        setCheckoutError('');
        setIsFedapayScriptError(false);

        checkoutTimeoutRef.current = window.setTimeout(() => {
            setCheckoutLoading(false);
            setCheckoutError('Le module de paiement a pris trop de temps à charger. Vérifiez votre connexion et réessayez.');
            setError('Le module de paiement FedaPay n’a pas pu démarrer après un délai d’attente.');
        }, 12000);

        return () => {
            if (checkoutTimeoutRef.current) {
                window.clearTimeout(checkoutTimeoutRef.current);
                checkoutTimeoutRef.current = null;
            }
        };
    }, [showFedapay, isFedapayScriptLoaded]);

    useEffect(()=>{
        if(error)
            notify(error,'error');
    }, [error]);

    if(loading) {
        return (
            <div className="flex items-center gap-2 h-max m-auto">
                <p>Loading prestataire details...</p>
            </div>
        );
    }
    if(!prestataire) {
        return (
            <div className="flex items-center gap-2 h-max m-auto">
                <h1>Veuillez réeffectuer la procédure de sélection.</h1>
                <Button
                    textContent="Voir les candidatures"
                    onClick={()=>router.push(`/client/tasks/${task.id}/applications`)}
                    className="bg-alizarin-crimson-red-51 rounded-sm mt-5 px-6 py-3 text-white font-semibold"
                    Icon={UserCircle2}
                />
            </div>
        );
    }
    return (
        <div>
            <Script
                src="https://cdn.fedapay.com/checkout.js?v=1.1.7"
                strategy="afterInteractive"
                onLoad={() => {
                    setIsFedapayScriptLoaded(true);
                    setIsFedapayScriptError(false);
                }}
                onError={() => {
                    setIsFedapayScriptError(true);
                    setCheckoutLoading(false);
                    setError('Impossible de charger le widget FedaPay. Veuillez réessayer ultérieurement.');
                }}
            />
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
                            <strong>{formatAmount(totalPayment)} {budgetCurrency}</strong>
                        </div>
                    </div>

                    <div className="rounded-md p-5 bg-yellow-fade border border-yellow my-5">
                        <p><strong className="text-scarpa-flow-gray-34">Sécurité Escrow:</strong> Votre budget sera bloqué en toute sécurité dans notre système de séquestre. Le prestataire ne recevra le paiement qu'après validation complète de la mission.</p>
                    </div>
                </div>

                <div className="bg-white px-10 py-15 rounded-md border flex flex-col justify-between gap-5">
                    <div className="flex items-center gap-5 justify-between">
                        <p className="font-bold text-3xl">Plateforme Fedapay sécurisée</p>
                        <p className="h-max py-1 px-3 bg-woodsmoke-gray-8 rounded-md text-white font-semibold">Fedapay</p>
                    </div>
                    {
                        error ?
                        <div className="flex flex-col justify-center items-center flex-1 border-2 py-5 border-dashed rounded-md ">
                            <Image
                                src={'/Assets/Error_Icon.svg'}
                                alt="error-payment"
                                height={100}
                                width={100}
                            />
                            <p className="my-2 font-bold text-xl">Paiement non effectué.</p>
                            <p className="text-scarpa-flow-gray-34 w-7/10 m-auto text-center">L'opération de paiement a été interrompue ou a échoué. Veuillez réessayer. </p>
                        </div> :
                        <div>
                            {/* Avant paiement */}
                        </div>
                    }
                    <div className="rounded-md p-5 bg-gallery-gray-93">
                        <p className="font-semibold">Méthodes de paiement acceptés</p>
                        <ul className="mt-3">
                            <li className="my-2 before:content-['•'] flex items-center gap-2 before:scale-150 text-scarpa-flow-gray-34">Mobile Money (MTN, Moov, Orange)</li>
                            <li className="my-2 before:content-['•'] flex items-center gap-2 before:scale-150 text-scarpa-flow-gray-34">Cartes bancaires</li>
                            <li className="my-2 before:content-['•'] flex items-center gap-2 before:scale-150 text-scarpa-flow-gray-34">Virement bancaires</li>
                        </ul>
                    </div>
                    <div className="">
                        <Button
                            textContent={`Payer ${formatAmount(totalPayment)} ${budgetCurrency}`}
                            className="rounded-md cursor-pointer bg-alizarin-crimson-red-51 text-white font-bold w-full  py-4 px-15 m-auto"
                            onClick={()=> setShowFedapay(true)}
                        />
                    </div>

                </div>
            </div>

            <div>
                <div className="grid xl:grid-cols-[33%_1fr] gap-5 mt-5 items-end">
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
            {showFedapay && (
            <div className="fixed inset-0 z-50 ">
                <div className="w-full h-full flex flex-col">
                    <div className="flex-1 w-full h-full ">
                        {isFedapayScriptError && (
                            <div className="rounded-md border border-red-200 bg-red-50 p-6 text-red-900">
                                <p className="font-semibold mb-2">Erreur de chargement FedaPay</p>
                                <p>Le widget de paiement n’a pas pu se charger. Vérifiez votre connexion ou réessayez plus tard.</p>
                            </div>
                        )}
                        {!isFedapayScriptError && checkoutError && (
                            <div className="rounded-md border border-yellow-200 bg-yellow-50 p-6 text-yellow-900">
                                <p className="font-semibold mb-2">Délai d’attente dépassé</p>
                                <p>{checkoutError}</p>
                            </div>
                        )}
                        {!isFedapayScriptError && !checkoutError && (!isFedapayScriptLoaded || checkoutLoading) && (
                            <div className="flex h-full items-center justify-center">
                                <p className="text-jumbo-gray-46">Veuillez patienter pendant le chargement du paiement.</p>
                            </div>
                        )}
                        {!isFedapayScriptError && !checkoutError && isFedapayScriptLoaded && !checkoutLoading && (
                            <Fedapay setShowFedapay={setShowFedapay} setError={setError} setPaymentInfos={setPaymentInfos} amount={totalPayment} />
                        )}
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default page