import Button from '@/components/ui/Button/Button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const StarterMissions = () => {
    const router = useRouter();
  return (
    <div className="mt-7 border shadow-2xs bg-white-solid py-12 text-center rounded-sm">
        <Image 
            src={'/Assets/Rocket.svg'}
            height={65}
            width={65}
            alt="rocket-icon"
            className="m-auto my-4 p-2 rounded-sm border border-gray-200 shadow-2xs"
        />
        <p className="text-2xl font-bold">Aucune tache active ?</p>
        <p className="text-scarpa-flow-gray-34 mt-2 mx-auto w-[90%] ">Lancer votre première candidature ou continuez a vous enrichir avec Upply.</p>
        <Button
            textContent="Decrocher un contrat"
            Icon={ArrowRight}
            Iposition="right"
            className="bg-alizarin-crimson-red-51 py-3 text-white-solid px-6 rounded-sm m-auto mt-4"
            onClick={()=> router.push('/prestataire/tasks')}
        />
    </div>

  )
}

export default StarterMissions