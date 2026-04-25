import { useTasks } from "@/hooks/useTasks";

const page: React.FC<{params:Promise<{id:string}>}> = async ({params}) => {
    const {id}= await params;
    const {tasks} = useTasks(id);
    const task = tasks[0];
  return (
    <div>
        
    </div>
  )
}

export default page