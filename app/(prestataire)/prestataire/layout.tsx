'use client'
import SidebarPrestataire from '@/components/dashboard/prestataire/SidebarPrestataire';
import SidebarPrestataireMobile from '@/components/dashboard/prestataire/SidebarPrestataireMobile';
import ReviewPage from '@/components/shared/review/ReviewPage';
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
                <SidebarPrestataire/>
            </div>
            <div className='md:hidden'>
                {isMobileSidebarOpened && 
                <Overlay isOpen={isMobileSidebarOpened} onClose={()=>{}}>
                    <SidebarPrestataireMobile isMobileSidebarOpened={isMobileSidebarOpened} setIsMobileSidebarOpened={setIsMobileSidebarOpened}/>
                </Overlay> }
            </div>
            <div className="w-full overflow-y-scroll bg-alabaster-gray-98 no-scrollbar">
                <div className="w-[95%] m-auto">
                    {/* {children} */}
                    <ReviewPage/>
                </div>
            </div>
        </div>
        <Footer/>
        <FooterMobile/>
    </div>
  )
}

export default layout