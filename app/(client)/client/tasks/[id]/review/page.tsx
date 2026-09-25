'use client'

import ReviewPage from '@/components/shared/review/ReviewPage';
import { useTasksContext } from '@/components/shared/tasks/TaskProvider';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ReviewProps } from '../../../../../../types/index';
import Spinner from '@/components/ui/Spinner/Spinner';

const page = () => {
    const {tasks:[task], getReview} = useTasksContext();
    const [review, setReview] = useState<ReviewProps| undefined>(); 
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
      const checkReview = async () => {
        if(task)
          if(task.status === 'VALIDEE'){
            try{
              const res = await getReview(task.id);
              setReview(res);
            }catch(e){}
            finally{
              setIsLoading(false);
            }
          }
      }
      checkReview();
    }, [task]);

  if(isLoading)
    return (<div className="h-[80vh] w-full flex items-center justify-center">
      <div className="flex items-center gap-2">
        <Spinner size={8}/>      
        <p>Loading...</p>
      </div>
    </div>)
  else if(task){
    if(!review && !isLoading)
      return (
          <ReviewPage task={task}/>
      )   
    else{
      return notFound();
    }
  }
  
}

export default page