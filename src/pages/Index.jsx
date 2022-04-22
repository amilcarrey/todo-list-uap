import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../components/Form";
import { fetchTasks } from "../store/tasks";

function pluralize(amount) {
  return `There ${amount === 1 ? 'is' : 'are'} ${amount} task${amount === 1 ? '' : 's'}`
}

export default function Index() {
  const loading = useSelector(state => !state.tasks.loaded)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTasks())
  }, [])

  const count = useSelector(state => state.tasks.tasks.length)

  return (
    <div className="flex flex-col items-center p-2">
      <div className="w-1/2 mb-2">
        <Form />

        <p className="text-xl text-center">{loading ? 'Loading...' : pluralize(count)}</p>
      </div>
    </div>
  )
}
