import Task from "./Task"

export default function List({ items = [{ text: 'Hola' }], remove = () => null, complete = () => null }) {
  const elements = items.map((task) => <Task key={task.id} task={task} remove={remove} complete={complete} />)
  return (
    <div>
      {elements}
    </div>
  )
}