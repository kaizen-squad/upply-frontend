'use client';
import { useTasks } from '@/hooks/useTasks';
import { TaskProps } from '@/types';
import { notFound } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect } from 'react';

interface TaskProviderProps {
  taskId: string;
  children: ReactNode;
}

const TasksContext = createContext<ReturnType<typeof useTasks> | undefined>(undefined);

/**
 * Reads task state from the nearest `TaskProvider`.
 *
 * @typeParam T - Task data type managed by the provider.
 * @returns The task hook result from the context.
 * @throws {Error} When called outside a `TaskProvider`.
 */
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
}: TaskProviderProps) {
  
  const taskManager = useTasks<T>(taskId);

  useEffect(()=>{
    if(!taskManager.loading && taskManager.tasks.length === 0){
      notFound()
    }
  }, [taskManager.loading, taskManager.tasks.length]);
  return (
    <TasksContext.Provider value={taskManager}> 
       {children}
    </TasksContext.Provider>
  );
}

export default TaskProvider;
