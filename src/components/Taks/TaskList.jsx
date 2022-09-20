import { useSelector, useDispatch } from 'react-redux'
import { deleteTask } from '../../features/tasks/taskSlice'
import { Link } from 'react-router-dom'

export const TaskList = () => {
  const stateTasks = useSelector(state => state.tasks)
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deleteTask(id))
  }

  return (
    <div className='w-4/6'>
      <header className='flex justify-between items-center py-4'>
        <h1 className='text-indigo-300 text-xl'>Total Tasks: {stateTasks.length}</h1>
        <Link to='/create-task' className='bg-indigo-600 px-2 py-1 rounded-sm text-sm'>
          Create Task
        </Link>
      </header>
      <div className='grid grid-cols-3 gap-4'>
        {
          stateTasks.map(task => (
            <div key={task.id} className='bg-neutral-800 p-4 rounded-md'>
              <h3 className='mb-3'>{task.title}</h3>
              <p className='mb-3'>{task.description}</p>
              <div className='flex justify-end gap-x-2'>
                <Link
                  to={`/edit-task/${task.id}`}
                  className='bg-zinc-500 px-2 py-1 text-sm rounded-md'
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(task.id)}
                  className='bg-red-500 px-2 py-1 text-sm rounded-md'
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
