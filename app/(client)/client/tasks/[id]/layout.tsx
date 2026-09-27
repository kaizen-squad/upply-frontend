'use client'
import TaskProvider from "@/components/shared/tasks/TaskProvider";
import { TaskProps } from "@/types";
import { useParams } from "next/navigation";
import { FC, ReactNode } from "react";

const Layout: FC<{children:ReactNode}> = ({children}) => {
    const params = useParams();
    const taskId = params.id as string;
  return (
    <TaskProvider<TaskProps> taskId={taskId}>
        {children}
    </TaskProvider>
  )
}

export default Layout
