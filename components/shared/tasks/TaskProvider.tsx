'use client';
import { useTasks } from '@/hooks/useTasks';
import { TaskProps } from '@/types';
import { notFound } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useMemo } from 'react';

interface TaskProviderProps<T = TaskProps > {
  taskId: string;
  children: ReactNode;
}

const TasksContext = createContext<ReturnType<typeof useTasks> | undefined>(undefined);

export function useTasksContext<T = TaskProps>() {
  const context = useContext(TasksContext);
  
  if (context === undefined) {
    throw new Error('useTasksContext must be used within a TaskProvider');
  }
  
  return context as ReturnType<typeof useTasks<T>>;
}

function TaskProvider<T = TaskProps >({ 
  taskId, 
  children 
}: TaskProviderProps<T>) {
  
  const taskManager = useTasks<T>(taskId);

  useEffect(()=>{
    if(!taskManager.loading && taskManager.tasks.length === 0){
      console.log('[Provider]')
      notFound()
    }
  },[taskManager.loading])
  return (
    <TasksContext.Provider value={taskManager}> 
       {children}
    </TasksContext.Provider>
  );
}

export default TaskProvider;
