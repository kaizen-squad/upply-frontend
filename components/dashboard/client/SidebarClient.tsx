'use client'
import SidebarOnglets from '@/components/shared/SidebarOnglets';
import Button from '@/components/ui/Button/Button';
import { useUserStore } from '@/hooks/store'
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';

const SidebarClient = () => {
    const {user} = useUserStore();
    const {logout} = useAuth();
    const onglets = {
        GENERAL: [
            {text: 'Tableau de bord', iconPath: 'LayoutDashboard.svg', redirect:'/client/dashboard'}
        ], 
        'GESTION PROJETS': [
            {text: 'Mes missions', iconPath: 'Mission.svg', redirect:'/client/tasks'},
            // {text: 'Candidatures recues', iconPath: 'Applications.svg', redirect:'/applications'},
            // {text: 'Livrables à valider', iconPath: 'Deliverables.svg', redirect:'/deliverables'},
        ],
        // FINANCES: [
        //     {text: 'Mes facturations', iconPath: 'Billing.svg', redirect:'/billing'},
        // ]
    }
  return (
    <aside className='pt-8 min-w-(--sidebar-width) shadow-2xs border-r-2 border-r-gray-200 h-(--main-height) relative left-0 top-0'>
        <SidebarOnglets onglets={onglets} />
        <div className='px-4 absolute bottom-5 w-full pt-5 border-t-2 border-t-gray-300'>
            <div className='flex items-center gap-1 p-2 border border-gray-300'>
                <Image
                    src={'/Assets/User.svg'}
                    alt='user'
                    width={50}
                    height={50}
                    loading='eager'
                />
                <div className='text-sm'>
                    <p className='font-bold'>{user?.name ?? 'Admin'}</p>
                    <p className='text-scarpa-flow-gray-34'>Compte: {user?.role ?? 'Prestataire'}</p>
                </div>
            </div>
            <Button 
                textContent='Se déconnecter'
                Icon={'/Assets/Logout.svg'}
                className='text-alizarin-crimson-red-51 pl-2 mt-2'
                onClick={()=> logout()}
            />
        </div>
    </aside> 
  );
}

export default SidebarClient