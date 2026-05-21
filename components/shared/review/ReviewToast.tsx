import Button from '@/components/ui/Button/Button';
import { useRouter } from 'next/navigation';
import { FC } from 'react'

const ReviewToast:FC<{username:string, task_id:string}> = ({ username, task_id}) => {
    const router = useRouter();
    return (
        <div>
            <small>RETOUR D'EXPERIENCE</small>
            <p>Notez le travail effectué par {username} sur votre mission. Cela participe au renforcement de la confiance sur Upply.</p>
            <Button
                textContent="Noter"
                className="py-3 rounded-md px-5 bg-green-success font-semibold"
                onClick={()=> router.push(`/client/tasks/${task_id}/review`)}
            />
        </div>
)
}

export default ReviewToast