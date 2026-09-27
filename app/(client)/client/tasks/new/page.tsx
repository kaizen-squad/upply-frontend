import TaskForm from '@/components/dashboard/client/TaskForm'

const page = () => {
  return (
    <div className='w-[95%] m-auto pb-10 lg:ml-20'>
        <div className='my-5 mb-8'>
            <h1>Publier une nouvelle mission</h1>
            <p className='text-scarpa-flow-gray-34 my-2'>Mettez vos besoins entre les mains de prestataires certifiés.</p>
        </div>
        <div className="lg:w-max">
            <TaskForm/>
        </div>
    </div>
  )
}

export default page
