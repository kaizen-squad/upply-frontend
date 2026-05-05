'use client'
import TaskProvider from '@/components/shared/tasks/TaskProvider'
import { ApplicationResponse } from '@/types';
import { useParams } from 'next/navigation';
import { FC, ReactNode } from 'react'

const layout:FC<{children:ReactNode}> = ({children}) => {
    const params = useParams();
    const taskId = params.id as string;
  return (
    <TaskProvider<ApplicationResponse> taskId={taskId}>
        {children}
    </TaskProvider>
  )
}   

export default layout