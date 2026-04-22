import Footer from "@/components/ui/Footer/Footer"
import Sidebar from "@/components/ui/Sidebar/Sidebar"
import { FC, ReactNode } from "react"

const layout:FC<{children: ReactNode}> = ({children}) => {

  return (
    <div>
        <div className="flex h-screen overflow-y-hidden">
            <div className="hidden md:block">
                <Sidebar/>
            </div>
            <div className="pt-15 w-full overflow-y-scroll">
                <div className="w-[90%] m-auto pb-10">
                    {children}
                </div>
            </div>
        </div>
        
        <Footer/>
    </div>
  )
}

export default layout