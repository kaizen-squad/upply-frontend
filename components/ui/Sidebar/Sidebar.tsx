'use client'
import { userStore } from '@/hooks/store'
import { ChartColumnDecreasing, LayoutGrid, NotepadText, Settings, Wallet } from 'lucide-react'
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const {user} = userStore();
    const router = useRouter();
    const onglets = [
        {Icon: LayoutGrid, text: 'DASHBOARD', redirect:''},
        {Icon: NotepadText, text: 'AVAILABLE TASKS', redirect:''},
        {Icon: Wallet, text: 'MY LEDGER', redirect:''},
        {Icon: ChartColumnDecreasing, text: 'ANALYTICS', redirect:''},
        {Icon: Settings, text: 'Settings', redirect:''},
    ];
    
  return (
    <aside className='pl-0.5 w-[250px] shadow-2xs border-r border-r-iron-2-gray-84 h-screen relative'>
        <div className='mb-8 mt-12 ml-7'>
            <p className='text-xl font-semibold'>{user?.name ?? 'Johny Sins'}</p>
            <small className='text-sm font-medium text-scarpa-flow-gray-34'>{(user?.role === 'client') ? 'VERIFIED WORKED' : 'VERIFIED ENTERPRISE'}</small>
        </div>
        <ul>
            {
                onglets.map(({Icon, text, redirect}) => 
                <li 
                    className='flex items-center duration-300 gap-5 text-scarpa-flow-gray-34 py-3 px-5 hover:border-l-6 border-l-alizarin-crimson-red-51 cursor-pointer hover:bg-gallery-gray-93 w-full hover:text-black'
                    onClick={()=> router.push(redirect)}
                >
                    <Icon/>
                    <small className='font-medium'>{text}</small>
                 </li>)
            }
        </ul>
        <button className='absolute bottom-10 left-[10%] w-[80%] py-2 bg-alizarin-crimson-red-51 rounded-md text-white-solid cursor-pointer hover:opacity-85 hover:scale-98 duration-200 '>Log Out</button>
    </aside> 
  );
}

export default Sidebar