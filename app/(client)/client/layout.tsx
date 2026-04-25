'use client'
import SidebarClient from '@/components/dashboard/client/SidebarClient';
import SiderbarClientMobile from '@/components/dashboard/client/SiderbarClientMobile';
import Footer from '@/components/ui/Footer/Footer';
import FooterMobile from '@/components/ui/Footer/FooterMobile';
import Header from '@/components/ui/Header/Header';
import { Overlay } from '@/components/ui/Overlay/Overlay';
import { ReactNode, useState } from 'react';

const layout:React.FC<{children:ReactNode}> = ({children}) => {
    const [isMobileSidebarOpened, setIsMobileSidebarOpened] = useState(false);

  return (
    <div>
        <Header isMobileSidebarOpened={isMobileSidebarOpened} setIsMobileSidebarOpened={setIsMobileSidebarOpened} />
        <div className="flex h-(--main-height) overflow-y-hidden">
            <div className=" hidden md:block">
                <SidebarClient/>
            </div>
            <div className='md:hidden'>
                {isMobileSidebarOpened && 
                <Overlay isOpen={isMobileSidebarOpened} onClose={()=>{}}>
                    <SiderbarClientMobile isMobileSidebarOpened={isMobileSidebarOpened} setIsMobileSidebarOpened={setIsMobileSidebarOpened}/>
                </Overlay> }
            </div>
            <div className="pt-5 w-full overflow-y-scroll bg-alabaster-gray-98 no-scrollbar">
                <div className="pb-10">
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