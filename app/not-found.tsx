'use client'
import Button from '@/components/ui/Button/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const NotFound = () => {
    const router = useRouter();
  return (
    <div className="h-screen w-screen flex" >
        <div className="h-max m-auto text-center" >
            <Image
                src='/Assets/Empty_Desktop.svg'
                alt='empty-page'
                width={100}
                height={100}
                className='scale-500 m-auto -translate-y-10'
            />
            <div className="relative z-2" >
                <p className="my-4 font-semibold text-gray-500 text-3xl">PAGE NOT FOUND !</p>
                <Button
                    textContent="Retour a l'acceuil"
                    className="py-3 px-6 rounded-md bg-alizarin-crimson-red-51 text-white-solid font-semibold w-max m-auto"
                    onClick={()=> router.push('/dashboard')}
                />
            </div>
           
        </div>
       
    </div>
  )
}

export default NotFound