'use client'
import Button from '@/components/ui/Button/Button';
import { useUserStore } from '@/hooks/store'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';

type OngletItem = {
  text: string;
  iconPath: string;
  redirect: string;
};

export type Onglets = {
  [category: string]: OngletItem[];
};
const SidebarOnglets:FC<Onglets> = (onglets) => {
    const router = useRouter();
    const pathname = usePathname();

  return (
    <div className='w-full'>
        <ul>
            {
                Object.entries(onglets).map(([key, entry], index) => 
                <div key={`${key}-${index}`} className='my-2 pl-1'>
                    <p className='font-semibold text-sm pl-5 my-1'>{key}</p>
                    {
                        entry.map(({text, iconPath, redirect}, index)=> <li key={index}
                        className={cn(
                            'flex items-center duration-300 gap-5 text-scarpa-flow-gray-34 py-3 px-5  border-l-alizarin-crimson-red-51 cursor-pointer  w-full hover:text-black',
                            (redirect && pathname.includes(redirect))
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
    </div> 
  );
}

export default SidebarOnglets