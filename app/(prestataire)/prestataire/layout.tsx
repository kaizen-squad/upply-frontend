'use client'
import SidebarPrestataire from '@/components/dashboard/prestataire/SidebarPrestataire';
import SidebarPrestataireMobile from '@/components/dashboard/prestataire/SidebarPrestataireMobile';
import Footer from '@/components/ui/Footer/Footer';
import FooterMobile from '@/components/ui/Footer/FooterMobile';
import Header from '@/components/ui/Header/Header';
import HeaderMobile from '@/components/ui/Header/HeaderMobile';
import { Overlay } from '@/components/ui/Overlay/Overlay';
import { useMediaQuery } from '@reactuses/core';
import { ReactNode, useState } from 'react';

const layout:React.FC<{children:ReactNode}> = ({children}) => {
    const [isMobileSidebarOpened, setIsMobileSidebarOpened] = useState(false);
    const isMobile = useMediaQuery('(max-width: 800px)', true);

  return (
    <div>
        {
            isMobile ? 
                <HeaderMobile isMobileSidebarOpened={isMobileSidebarOpened} setIsMobileSidebarOpened={setIsMobileSidebarOpened} />
                :
                <Header role="prestataire" />
        }
        <div className="flex md:mt-0 mt-(--header-height) md:h-(--main-height) md:overflow-y-hidden">
            {
                isMobile ?
                <div>
                     {
                        isMobileSidebarOpened && 
                        <Overlay isOpen={isMobileSidebarOpened} onClose={()=>{}}>
                            <SidebarPrestataireMobile isMobileSidebarOpened={isMobileSidebarOpened} setIsMobileSidebarOpened={setIsMobileSidebarOpened}/>
                        </Overlay> 
                    }
                </div>
                :
                <SidebarPrestataire/>
            }   
            <div className="w-full md:overflow-y-scroll bg-alabaster-gray-98 no-scrollbar">
                <div className="m-auto w-[95%] min-h-(--main-height) py-10 flex">
                    {children}
                </div>
            </div>
        </div>
        { isMobile ? <FooterMobile/> : <Footer/> }
        
    </div>
  )
}

export default layout