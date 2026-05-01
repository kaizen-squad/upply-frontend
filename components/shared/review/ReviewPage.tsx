import { CircleAlert } from 'lucide-react'
import ReviewForm from './ReviewForm'
import Image from 'next/image'
import { useTasksContext } from '../tasks/TaskProvider'
import { formatFrenchDateIntl } from '@/lib/utils'
import { budgetCurrency } from '@/hooks/useTasks'
import { TaskProps } from '@/types'

const ReviewPage = () => {
  // const {tasks:[task]} = useTasksContext();
  const task: TaskProps = {
        id: 'task_001',
    client_id: 'client_001',
    prestataire_id: 'prestataire_101',
    title: 'Création API REST pour application de réservation',
    description: 'Développer une API complète avec authentification JWT, documentation Swagger, endpoints pour gérer les réservations, utilisateurs et paiements.',
    budget: 2500,
    deadline: '2026-06-15',
    status: 'EN_COURS',
    created_at: '2026-04-01T10:30:00Z',

  }
  return (
    <div className='my-10'>      
    <h1>Evaluer votre expérience</h1>
      <div className='grid lg:grid-cols-[60%_1fr] gap-10 mt-10'>
        <div>
            <div className='mb-5 border p-5 md:shadow-none shadow-[5px_5px_1px_1px] shadow-gray-950'>
              <p className='font-semibold text-[0.9rem] text-scarpa-flow-gray-34'>DETAILS DE LA MISSION</p>
              <hr className='border border-gray-300 w-full my-2' />

              <div className='flex items-center justify-between'>
                <div className='w-[70%]'>
                  <p className='font-bold text-xl'>{task?.title ?? 'Supervision de la mission Shein'}</p>
                  <small className='text-santa-gray text-[0.85rem]'>Terminé le {formatFrenchDateIntl(task?.created_at ?? '')}</small>
                </div>
                <div>
                  <p className='text-scarpa-flow-gray-34 text-[0.9rem]'>MONTANT FINAL</p>
                  <p className='text-alizarin-crimson-red-51 text-xl font-bold'>{task?.budget ?? 10.000} {budgetCurrency}</p>
                </div>
              </div>
            </div>
            <ReviewForm/>
        </div>
          <div>
            <div className='flex-col gap-5 hidden md:flex'>
              <div className='border p-5 bg-white-solid'>
                  <div className='flex items-center gap-2'>
                      <CircleAlert/>
                      <p className='font-semibold text-xl'>Pourquoi noter ?</p>
                  </div>
                  <hr className='border border-gray-300 w-full my-3' />
                  <p className='text-scarpa-flow-gray-34'>Votre avis aide la communauté à identifier les meilleurs profils et garantit la sécurité de tous sur Upply.</p>
              </div>

              <div className='border p-5 bg-white-solid hidden md:block'>
                  <div className='flex items-center gap-2'>
                      <Image
                        src={'/Assets/Deliverables.svg'}
                        alt='icon'
                        height={20}
                        width={20}
                      />
                      <p className='font-semibold text-xl'>Critères suggérés</p>
                  </div>
                    <hr className='border border-gray-300 w-full my-3' />
                  <ul className='text-scarpa-flow-gray-34 marker:text-blue-600 marker:font-bold pl-5'>
                    <li className=" before:pr-3 before:content-['■'] before:left-0 before:text-lg">Communication</li>
                    <li className=" before:pr-3 before:content-['■'] before:text-lg">Respect des délais</li>
                    <li className=" before:pr-3 before:content-['■'] before:text-lg">Qualité du travail</li>
                  </ul>
              </div>

              <div className='border p-5 bg-white-solid hidden md:block'>
                <div className='flex items-center gap-2'>
                    <Image
                      src={'/Assets/Support.svg'}
                      alt='icon-support'
                      height={20}
                      width={20}
                    />
                    <p className='font-semibold text-xl'>Support</p>
                </div>
                  <hr className='border border-gray-300 w-full my-3' />
                <p className='text-scarpa-flow-gray-34'>Un problème avec cette mission ? Upply vous assure un service client irréprochable et à même de répondre à vos besoins</p>
              </div>
            </div>

            <div className='md:hidden'>
                <p className='text-4xl font-bold text-bold text-center my-5'>Pourquoi noter?</p>
                <p className='w-[80%] m-auto text-center text-xl font-medium'>Vos évaluations aident à maintenir un réseau deconfiance et de qualité pour tous les utilisateurs Upply.</p>
            </div>

          </div>

      </div>
    </div>
  )
}

export default ReviewPage