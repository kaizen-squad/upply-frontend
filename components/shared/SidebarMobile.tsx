import SidebarOnglets, { Onglets } from '@/components/shared/SidebarOnglets';
import Button from '@/components/ui/Button/Button';
import { useUserStore } from '@/hooks/store'
import { cn } from '@/lib/utils';
import { X } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';
import { Dispatch, FC, SetStateAction } from 'react';

const SiderbarMobile :FC<{isMobileSidebarOpened: boolean, setIsMobileSidebarOpened:Dispatch<SetStateAction<boolean>>, onglets: Onglets}> = ({isMobileSidebarOpened, setIsMobileSidebarOpened, onglets}) => {
    const {user}=useUserStore();    
    const router = useRouter();
    const pathname = usePathname();

  return (
    <aside className='absolute right-0 z-1 bg-white top-(--header-height) mt-2 w-[80%]'>
        <div className='pt-5'>
            <button className='relative left-5 flex items-center justify-center p-2 rounded-full cursor-pointer duration-200 hover:bg-gray-200' onClick={()=>{
                if(isMobileSidebarOpened)
                    setIsMobileSidebarOpened(false)
            }}>
                <X/>
            </button>
            <div>
                <div className='flex items-center gap-1 p-2 pb-5 px-5 border-b border-b-gray-300'>
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
            </div>
        </div>
        <div>
            <SidebarOnglets {...onglets} />
        </div>

        <div>
            <Button 
                textContent='Se déconnecter'
                Icon={'/Assets/Logout.svg'}
                className='text-alizarin-crimson-red-51 p-5 mt-8 w-full'
            />
        </div>
    </aside>
  )
}

export default SiderbarMobile