import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, editTask } from '../../features/tasks/taskSlice'
import { v4 as uuid } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'

const TodoForm = () => {
  const [task, setTask] = useState({
    title: '',
    description: ''
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const tasks = useSelector(state => state.tasks)

  const handleChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (params.id) {
      dispatch(editTask(task))
    } else {
      dispatch(addTask({
        ...task,
        id: uuid()
      }))
    }
    navigate('/')
  }

  useEffect(() => {
    if (params.id) {
      setTask(tasks.find(task => task.id === params.id))
    }
  }, [params.id, task])

  return (
    <form onSubmit={handleSubmit} className='bg-zinc-800 w-2/6 p-4'>
      <label htmlFor='title' className='block text-xs font-bold mb-2'>Task:</label>
      <input
        name='title'
        type='text'
        placeholder='title'
        value={task.title}
        onChange={handleChange}
        className='w-full p-2 rounded-md bg-zinc-600 mb-2'
      />

      <label htmlFor='Description' className='block text-xs font-bold mb-2'>Description:</label>
      <textarea
        name='description'
        placeholder='Add description'
        value={task.description}
        onChange={handleChange}
        className='w-full p-2 rounded-md bg-zinc-600 mb-2'
      />
      <button className='bg-indigo-600 px-2 py-1 rounded-md'>Save</button>
    </form>
  )
}

export default TodoForm
