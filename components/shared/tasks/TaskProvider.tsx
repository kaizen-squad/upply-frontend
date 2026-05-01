'use client'
import { useTasks } from '@/hooks/useTasks';
import { createContext, FC, ReactNode, useContext, useMemo } from 'react'

type TaskContextValue = ReturnType<typeof useTasks>;
const TasksContext = createContext<TaskContextValue |undefined>(undefined);

export const useTasksContext = () => {
    const context = useContext(TasksContext);

    if(context === undefined)
        throw new Error('Task context is required');

    return context
}

const TaskProvider:FC<{taskId:string, children:ReactNode}> = ({taskId, children}) => {
    const taskManager = useTasks(taskId);
    const value = useMemo(() => taskManager, [taskManager]);
  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  )
}

export default TaskProvider