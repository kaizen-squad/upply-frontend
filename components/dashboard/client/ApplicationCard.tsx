import Button from '@/components/ui/Button/Button';
import { useModalify } from '@/components/ui/Modal/hooks/useModalify';
import { useApplication } from '@/hooks/useTasks';
import { getInitials } from '@/lib/utils';
import { ApplicationResponse } from '@/types';
import { useMediaQuery } from '@reactuses/core';
import Rating from 'react-ratings-star';

const ApplicationCard = ({ application }: { application: ApplicationResponse }) => {
        const { rejectApplication, acceptApplication } = useApplication();
        const { modalify } = useModalify();
        const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <div className="md:flex gap-5 bg-white-solid rounded-sm p-5 border py-10">
        <div className="flex gap-4">
            <p className="font-bold bg-gallery-gray-93  rounded-full border border-gray-300 p-4 text-center h-max w-max flex items-center">{getInitials(application.prestataire.name)}</p>
            <div>
                <p className="font-semibold">{application.prestataire.name}</p>
                <div className="flex items-center gap-2 my-1">
                    <p>{application.prestataire.rating_avg.toFixed(1)}/5</p>
                    <Rating 
                        value={application.prestataire.rating_avg}
                        size={15}
                        fullColor="var(--yellow)"
                        emptyColor="#e4e5e9"
                    />
                </div>
                {!isMobile && <p className="text-scarpa-flow-gray-34 mt-3">{application.message}</p>}
            </div>                
        </div>            
        {isMobile && <p className="text-scarpa-flow-gray-34 mt-3">{application.message}</p>}

        <div className="flex gap-4 md:flex-col mt-5 md:mt-0">
            <Button
                textContent="Selectionner"
                className="py-3 px-5 bg-alizarin-crimson-red-51 text-white-solid font-semibold rounded-sm shadow-none w-full"
                onClick={() => {
                    modalify(
                        <AcceptApplicationModal application={application} />,
                        {
                            title: 'Confirmer la sélection',
                            onConfirm: () => acceptApplication(application.id),
                            id: 'accept-application-modal',
                        }
                    )
                }}
            />
            <Button
                textContent="Rejeter"
                className="py-3 px-6 bg-iron-2-gray-84 font-semibold rounded-sm shadow-none w-full"
                onClick={() => {
                    modalify(
                        <RejectApplicationModal application={application} />,
                        {
                            title: 'Confirmer le rejet',
                            onCancel: () => {
                                console.log('Rejet annulé');
                            },
                            id: 'reject-application-modal',
                        }
                    );
                }}
            />
        </div>
    </div>
  )
}

export default ApplicationCard;

const AcceptApplicationModal = ({ application }: { application: ApplicationResponse}) => {
    const { close } = useModalify();
    const { proceedToPayment } = useApplication();
    return (
        <div>
            <p>Êtes-vous sûr de vouloir sélectionner <em className="font-semibold">{application.prestataire.name}</em> pour cette mission ?</p>
            <div className="flex items-center w-full gap-5 mt-5">
                <Button
                    textContent="Sélectionner"
                    className="bg-alizarin-crimson-red-51 py-3 px-5 rounded-sm text-white-solid font-semibold w-full"
                    onClick={() => {
                        proceedToPayment({ application_id: application.id, task_id: application.task_id, prestataire_name: application.prestataire.name });
                        close('accept-application-modal');
                    }}
                />
                <Button
                    textContent="Annuler"
                    className="bg-iron-2-gray-84 py-3 px-5 rounded-sm font-semibold w-full"
                    onClick={() => close('accept-application-modal')}
                />
            </div>
        </div>
    )
}

const RejectApplicationModal = ({ application }: { application: ApplicationResponse}) => {
    const { close } = useModalify();
    const { rejectApplication } = useApplication();
    return (
        <div>
            <p>Êtes-vous sûr de vouloir rejeter la candidature de <em className="font-semibold">{application.prestataire.name}</em> pour cette mission ?</p>
            <div className="flex items-center w-full gap-5 mt-5">
                <Button
                    textContent="Rejeter"
                    className="bg-alizarin-crimson-red-51 py-3 px-5 rounded-sm text-white-solid font-semibold w-full"
                    onClick={() => {
                        rejectApplication(application.id);
                        close('reject-application-modal');
                    }}
                />  
                <Button
                    textContent="Annuler"
                    className="bg-iron-2-gray-84 py-3 px-5 rounded-sm font-semibold w-full"
                    onClick={() => close('reject-application-modal')}
                />
            </div>
        </div>
    )
}