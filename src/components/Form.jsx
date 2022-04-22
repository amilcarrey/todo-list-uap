import { useDispatch, useSelector } from "react-redux"
import { type, add } from "../store/tasks"

export default function Form() {
  const text = useSelector(state => state.tasks.text)
  const dispatch = useDispatch()
  
  const enter = () => dispatch(add())

  return (
    <div className="bg-white border-2 rounded-lg p-4 w-full flex flex-col">
      <input
        className="h-16 mb-2 p-2 border-2 rounded-md text-xl"
        placeholder="Nueva tarea"
        value={text}
        onChange={e => dispatch(type(e.target.value))}
        onKeyUp={e => e.key === 'Enter' && enter()}
      />
      <button
        className="p-3 rounded-md bg-blue-400 transition-all uppercase font-bold hover:bg-blue-500 active:bg-blue-600 text-white"
        onClick={enter}
      >
        Agregar
      </button>
    </div>
  )
}