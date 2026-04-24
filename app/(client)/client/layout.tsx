'use client'
import Footer from '@/components/ui/Footer/Footer';
import FooterMobile from '@/components/ui/Footer/FooterMobile';
import Sidebar from '@/components/ui/Sidebar/Sidebar';
import { TaskProps } from '@/types';
import { ReactNode } from 'react';

const layout:React.FC<{children:ReactNode}> = ({children}) => {

  return (
    <div>
        <div className="flex h-screen overflow-y-hidden">
            <div className="hidden md:block">
                <Sidebar/>
            </div>
            <div className="pt-15 w-full overflow-y-scroll bg-alabaster-gray-98">
                <div className="w-[90%] m-auto pb-10">
                    {children}
                </div>
            </div>
        </div>
        <Footer/>
        <FooterMobile/>
    </div>
  )
}

export default layout