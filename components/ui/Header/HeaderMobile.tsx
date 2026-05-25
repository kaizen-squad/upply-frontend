import Image from 'next/image';
import { Dispatch, FC, SetStateAction } from 'react'

const HeaderMobile : FC<{isMobileSidebarOpened: boolean, setIsMobileSidebarOpened:Dispatch<SetStateAction<boolean>>}> = ({isMobileSidebarOpened, setIsMobileSidebarOpened})=> {
  return (
    <header>
        <div className='h-(--header-height) flex items-center justify-between px-5 py-3 border-b border-b-gallery-gray-93 z-50 fixed w-full bg-white'>
            <Image
                src={'/Assets/UpplySVG.svg'}
                loading='eager'
                width={80}
                height={80}
                alt='upply-logo'
            />
            <button 
                className='flex items-center justify-center rounded-full cursor-pointer duration-200 hover:bg-gray-200'
                onClick={()=> {
                    if(!isMobileSidebarOpened)
                        setIsMobileSidebarOpened(true)
                }}>
                <Image
                    src={'/Assets/User.svg'}
                    alt='sidebar'
                    width={40}
                    height={40}
                    loading='eager'
                />
            </button>
        </div>
    </header>
  )
}

export default HeaderMobile