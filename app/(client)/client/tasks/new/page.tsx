import TaskForm from '@/components/dashboard/client/TaskForm'

const page = () => {
  return (
    <div className='lg:pl-15 w-[90%] m-auto'>
        <div className='my-5 mb-8'>
            <h1>Publier une nouvelle mission</h1>
            <p className='text-santa-gray my-2'>Mettez vos besoins entre les mains de prestataires certifiés.</p>
        </div>
        <div>
            <TaskForm/>
        </div>
    </div>
  )
}

export default page