import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, filter as filtrar, remove, toggle } from "../store/tasks";
import Filters from "../components/Filters";
import List from "../components/List";

export default function TaskList() {
  const tasks = useSelector(state => state.tasks.tasks)
  const filter = useSelector(state => state.tasks.filter)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTasks())
  }, [])

  const removeTask = (task) => dispatch(remove(task))
  const toggleTask = (task) => dispatch(toggle(task))

  const filteredTasks = useMemo(() => {
    if (!filter) { return tasks }
    const finished = filter === 2
    return tasks.filter(t => t.finished === finished)
  }, [filter, tasks])

  return (
    <div className="flex flex-col items-center">
      <Filters active={filter} setFilter={(v) => dispatch(filtrar(v))} />

      <div className="w-3/5">
        <List items={filteredTasks} remove={removeTask} complete={toggleTask} />
      </div>
    </div>
  )
}