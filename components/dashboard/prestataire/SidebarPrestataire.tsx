'use client'
import SidebarOnglets, { SidebarOngletsProps } from '@/components/shared/SidebarOnglets';
import Button from '@/components/ui/Button/Button'
import { useUserStore } from '@/hooks/store';
import Image from 'next/image'

const SidebarPrestataire = () => {
    const {user} = useUserStore();
    const onglets :SidebarOngletsProps['onglets'] = {
        ACCUEIL: [
            {text: 'Tableau de bord', iconPath:'LayoutDashboard.svg', redirect:'/prestataire/dashboard'}
        ],
        OPPORTUNITES: [
            {text: 'Marché des missions', iconPath:'MissionsCenter.svg', redirect:'/prestataire/tasks'},
        ],
        'ACTIVITE & EXECUTION': [
            {text: 'Soumettre Livrable', iconPath:'DeliverablesTruck.svg', redirect:'/prestataire/deliverables'}
        ], 
        FINANCES: [
            {text: 'Mes Facturations', iconPath:'BillingPocket.svg', redirect:'/prestataire/billing'}
        ]
    }
  return (
    <aside className='pt-8 min-w-(--sidebar-width) shadow-2xs border-r-2 border-r-gray-200 h-(--main-height) relative left-0 top-0' >
        <SidebarOnglets onglets={onglets} />
        <div className='px-4 absolute bottom-5 w-full pt-5 border-t-2 border-t-gray-300'>
            <div>
                <div className='flex items-center gap-1'>
                    <Image
                        src={'/Assets/User.svg'}
                        alt='user'
                        width={50}
                        height={50}
                        loading='eager'
                    />
                    <div className='text-sm'>
                        <p className='font-bold'>{user?.name ?? 'User'}</p>
                        <p className='text-scarpa-flow-gray-34'>Compte: {user?.role.split('').map((l, index)=>index===0 ? l.toUpperCase() : l).join('') ?? 'Prestataire'}</p>
                    </div>
                </div>
                <hr className='border-3 border-gray-500 mt-2' />
            </div>
            <Button
                textContent='Se déconnecter'
                Icon={'/Assets/Logout.svg'}
                className='text-alizarin-crimson-red-51 pl-2 mt-2'
            />
        </div>
    </aside>
  )
}

export default SidebarPrestataire