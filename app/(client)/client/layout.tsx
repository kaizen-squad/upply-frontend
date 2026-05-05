'use client'
import SidebarClient from '@/components/dashboard/client/SidebarClient';
import SiderbarClientMobile from '@/components/dashboard/client/SidebarClientMobile';
import Footer from '@/components/ui/Footer/Footer';
import FooterMobile from '@/components/ui/Footer/FooterMobile';
import Header from '@/components/ui/Header/Header';
import HeaderMobile from '@/components/ui/Header/HeaderMobile';
import { Overlay } from '@/components/ui/Overlay/Overlay';
import { useMediaQuery } from '@reactuses/core';
import { ReactNode, useState } from 'react';

const layout:React.FC<{children:ReactNode}> = ({children}) => {
    const [isMobileSidebarOpened, setIsMobileSidebarOpened] = useState(false);
<<<<<<< HEAD
    const isMobile = useMediaQuery('(max-width: 800px)', true);
=======
    const isMobile = useMediaQuery('(max-width: 650px)');
>>>>>>> d64a8fd (Resolve responsive rendering logic with useMediaQuery)
  return (
    <div>
        {
            isMobile ? 
                <HeaderMobile isMobileSidebarOpened={isMobileSidebarOpened} setIsMobileSidebarOpened={setIsMobileSidebarOpened} />
                :
                <Header/>
        }
        <div className="flex h-(--main-height) overflow-y-hidden">
            {
                isMobile ? 
                    <div className='md:hidden'>
                        {
                            isMobileSidebarOpened && 
                            <Overlay isOpen={isMobileSidebarOpened} onClose={()=>{}}>
                                <SiderbarClientMobile isMobileSidebarOpened={isMobileSidebarOpened} setIsMobileSidebarOpened={setIsMobileSidebarOpened}/>
                            </Overlay> 
                        }
                    </div>
                :
                    <SidebarClient/>
            }
            <div className="pt-5 w-full overflow-y-scroll bg-alabaster-gray-98 no-scrollbar">
                <div className="pb-10 m-auto w-[95%]">
                    {children}
                </div>
            </div>
        </div>
        { isMobile ? <FooterMobile/> : <Footer/> }
    </div>
  )
}

export default layout