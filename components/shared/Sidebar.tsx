'use client'
import { useUserStore } from '@/hooks/store'
import { ChartColumnDecreasing, LayoutGrid, NotepadText, Settings, Wallet } from 'lucide-react'
import { useRouter } from 'next/navigation';
import Button from '../ui/Button/Button';

const Sidebar = () => {
    const {user} = useUserStore();
    const router = useRouter();
    const onglets = [
        {Icon: LayoutGrid, text: 'DASHBOARD', redirect:''},
        {Icon: NotepadText, text: 'AVAILABLE TASKS', redirect:''},
        {Icon: Wallet, text: 'MY LEDGER', redirect:''},
        {Icon: ChartColumnDecreasing, text: 'ANALYTICS', redirect:''},
        {Icon: Settings, text: 'Settings', redirect:''},
    ];
    
  return (
    <aside className='pl-0.5 pt-12 w-(--sidebar-width) shadow-2xs border-r-2 border-r-gray-200 h-screen relative left-0 top-0'>
        <div className='mb-8 ml-7'>
            <p className='text-xl font-semibold'>{user?.name ?? 'Johny Sins'}</p>
            <small className='text-sm font-medium text-scarpa-flow-gray-34'>{(user?.role === 'client') ? 'VERIFIED WORKED' : 'VERIFIED ENTERPRISE'}</small>
        </div>
        <ul>
            {
                onglets.map(({Icon, text, redirect}, index) => 
                <li key={index}
                    className='flex items-center duration-300 gap-5 text-scarpa-flow-gray-34 py-3 px-5 hover:border-l-6 border-l-alizarin-crimson-red-51 cursor-pointer hover:bg-gallery-gray-93 w-full hover:text-black'
                    onClick={()=> router.push(redirect)}
                >
                    <Icon/>
                    <small className='font-medium'>{text}</small>
                 </li>)
            }
        </ul>
        <Button
            className='absolute bottom-10 left-[10%] w-[80%] py-2 bg-alizarin-crimson-red-51 rounded-md text-white-solid'
            textContent='Log Out' 
        />
    </aside> 
  );
}

export default Sidebar