'use client';
import { useTasks } from '@/hooks/useTasks';
import { ApplicationResponse, TaskProps } from '@/types';
import { createContext, FC, ReactNode, useContext, useMemo } from 'react';

interface TaskProviderProps<T = TaskProps | ApplicationResponse> {
  taskId: string;
  children: ReactNode;
}

const TasksContext = createContext<ReturnType<typeof useTasks> | undefined>(undefined);

export function useTasksContext<T = TaskProps | ApplicationResponse>() {
  const context = useContext(TasksContext);
  
  if (context === undefined) {
    throw new Error('useTasksContext must be used within a TaskProvider');
  }
  
  return context as ReturnType<typeof useTasks<T>>;
}

function TaskProvider<T = TaskProps | ApplicationResponse>({ 
  taskId, 
  children 
}: TaskProviderProps<T>) {
  const taskManager = useTasks<T>(taskId);
  
  return (
    <TasksContext.Provider value={taskManager}>
      {children}
    </TasksContext.Provider>
  );
}

export default TaskProvider;
