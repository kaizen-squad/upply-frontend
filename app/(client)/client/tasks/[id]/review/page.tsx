'use client'

import ReviewPage from '@/components/shared/review/ReviewPage';
import { useTasksContext } from '@/components/shared/tasks/TaskProvider';
import { notFound } from 'next/navigation';
import { useEffect } from 'react';

const page = () => {
    const {tasks:[task], loading, getReview} = useTasksContext();

    useEffect(()=>{
      if(task)
        if(task.status === 'VALIDEE'){
            const hasBeenReviewed = getReview(task.id);
            if(!hasBeenReviewed)
              notFound();
        }else notFound(); 
    }, [loading]);

  return (
      <ReviewPage task={task}/>
  ) 
  
}

export default page