import Button from "@/components/ui/Button/Button";
import { Textarea } from "@/components/ui/Textarea/Textarea";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form"
import Rating from "react-ratings-star";

const ReviewForm = () => {
    const {control, handleSubmit, formState: {isValid, isSubmitting}} = useForm();
  return (
    <form className="bg-white-solid p-5 py-7 border md:shadow-none shadow-[5px_5px_1px_1px] shadow-gray-950">
        <h2>Notez votre collaborateur</h2>
        <div className="mt-5">
            <Controller
                name="rating"
                control={control}
                rules={{required:true}}
                render={({field})=> 
                    <div className="flex items-center justify-between">
                        <Rating
                            value={field.value}
                            onRatingChange={field.onChange}
                            size={35}
                            fullColor="var(--alizarin-crimson-red-51)"  // jaune
                            emptyColor="#d1d5db" // gris
                        />   
                        <p className="text-3xl font-bold">{field.value ?? 0} / 5</p>      
                    </div>
                }
            />
        </div>
        <div className="mt-5">
            <Controller
                name="comment"
                control={control}
                render={({field, fieldState:{error}})=> 
                    <Textarea 
                        {...field} 
                        error={error?.message ?? ''} 
                        label="COMMENTAIRE" optional={true} 
                        placeholder="Partagez votre expérience avec ce collaborateur..." 
                        className="h-40 border rounded-none border-black" 
                    />}
            />
        </div>
        
        <Button
            isLoading={isSubmitting}
            disabled={!isValid}
            textContent="ENVOYER L'EVALUATION"
            Icon={()=> <Image src={'/Assets/Send.svg'} alt="send" height={20} width={20} />}
            Iposition="right"
            className="bg-alizarin-crimson-red-51 w-full mt-5 py-3 text-white-solid"
        />
    </form>
  )
}

export default ReviewForm