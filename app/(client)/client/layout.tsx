'use client'
import SidebarClient from '@/components/dashboard/client/SidebarClient';
import SiderbarClientMobile from '@/components/dashboard/client/SidebarClientMobile';
import Footer from '@/components/ui/Footer/Footer';
import FooterMobile from '@/components/ui/Footer/FooterMobile';
import Header from '@/components/ui/Header/Header';
import HeaderMobile from '@/components/ui/Header/HeaderMobile';
import { Overlay } from '@/components/ui/Overlay/Overlay';
import { useMediaQuery } from '@reactuses/core';
import { clsx } from 'clsx';
import { ReactNode, useState } from 'react';

const Layout:React.FC<{children:ReactNode}> = ({children}) => {
    const [isMobileSidebarOpened, setIsMobileSidebarOpened] = useState(false);
    const isMobile = useMediaQuery('(max-width: 800px)', true);
  return (
    <div>
        {
            isMobile ? 
                <HeaderMobile isMobileSidebarOpened={isMobileSidebarOpened} setIsMobileSidebarOpened={setIsMobileSidebarOpened} />
                :
                <Header role="client" />
        }
        <div className={clsx("flex mt-(--header-height) md:h-(--main-height) md:overflow-y-hidden", !isMobile && 'mt-0')}>
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

export default Layout
