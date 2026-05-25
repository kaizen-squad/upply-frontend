import { useMediaQuery } from '@reactuses/core';
import Image from 'next/image';

const EmptyImage = () => {
    const isMobile = useMediaQuery('(max-width: 700px)', true);
  return (
    <div>
        {
            isMobile ? 
                <Image
                  src={'/Assets/Empty_Mobile.svg' }
                  alt="empty-box"
                  height={100}
                  width={100}
                  className="scale-200 z-0 -translate-y-10 translate-x-2  m-auto"
                  loading="eager"
                /> 
                :
                <Image
                    src={'/Assets/Empty_Desktop.svg'}
                    alt="empty-box"
                    height={200}
                    width={200}
                    className="scale-200 z-0 m-auto"
                    loading="eager"
                /> 
        }
    </div>
  )
}

export default EmptyImage