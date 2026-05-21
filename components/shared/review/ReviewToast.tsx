import { cn, getInitials } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { FC } from 'react'
import { toast } from 'react-hot-toast';

const ReviewToast:FC<{username:string, task_id:string, t:any}> = ({ username, task_id, t}) => {
    const router = useRouter();
    return (
        <div
            className={cn(`max-w-md w-full bg-[#333] shadow-lg rounded-lg pointer-events-auto flex ring-opacity-5 text-white-solid items-center`)}
            style={{animation:`custom-enter .3s forwards ease-in-out ${t.visible ? '':'reverse'}`}}
        >
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                    <p className="p-3 px-3.5 bg-woodsmoke-gray-8 font-bold rounded-full flex justify-center items-center text-center">{getInitials(username)}</p>
                    </div>
                    <div className="ml-3 flex-1">
                    <p className="text-sm font-medium">
                        {username}
                    </p>
                    <p className="mt-1 text-sm text-gray-300">
                        Votre prestataire choisi.
                    </p>
                    </div>
                </div>
            </div>
            <div className="">
                <button
                    onClick={() =>{ 
                        router.push(`/client/tasks/${task_id}/review`);
                        toast.dismiss(t.id);
                    }}
                    className="mr-4 cursor-pointer border border-transparent rounded-md  px-4 py-2 flex items-center justify-center text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gallery-gray-93 text-black"
                >
                    Noter
                </button>
            </div>
        </div>
    )
}

export default ReviewToast