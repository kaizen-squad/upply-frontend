'use client'
import Button from '@/components/ui/Button/Button';
import { useUserStore } from '@/hooks/store'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const SidebarClient = () => {
    const {user} = useUserStore();
    const router = useRouter();
    const pathname = usePathname();

    const onglets = {
        GENERAL: [
            {text: 'Tableau de bord', iconPath: 'LayoutDashboard.svg', redirect:'/client/dashboard'}
        ], 
        'GESTION PROJETS': [
            {text: 'Mes missions', iconPath: 'Mission.svg', redirect:'/client/dashboard/tasks/new'},
            {text: 'Candidatures recues', iconPath: 'Applications.svg', redirect:'/applications'},
            {text: 'Livrables à valider', iconPath: 'Deliverables.svg', redirect:'/deliverables'},
        ],
        FINANCES: [
            {text: 'Mes facturations', iconPath: 'Billing.svg', redirect:'/billing'},
        ]
    }
  return (
    <aside className='pt-12 w-(--sidebar-width) shadow-2xs border-r-2 border-r-gray-200 h-(--main-height) relative left-0 top-0'>
        <ul>
            {
                Object.entries(onglets).map(([key, entry], index) => 
                <div key={`${key}-${index}`} className='my-2 pl-1'>
                    <p className='font-semibold text-sm pl-5'>{key}</p>
                    {
                        entry.map(({text, iconPath, redirect}, index)=> <li key={index}
                        className={cn(
                            'flex items-center duration-300 gap-5 text-scarpa-flow-gray-34 py-3 px-5  border-l-alizarin-crimson-red-51 cursor-pointer  w-full hover:text-black',
                            pathname.endsWith(redirect) 
                            ? 'bg-gallery-gray-93 w-full border-l-6' 
                            : 'hover:border-l-6 hover:bg-gallery-gray-93'
                        )}
                        onClick={()=> router.push(redirect)}
                    >
                        <Image
                            src={`/Assets/${iconPath}`}
                            alt={`icon-${iconPath}`}
                            width={20}
                            height={20}
                            loading='eager'
                        />
                        <small className='font-medium text-[0.85rem]'>{text}</small>
                    </li>)
                    }
                </div>
                )
            }
        </ul>
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
            />
        </div>
    </aside> 
  );
}

export default SidebarClient