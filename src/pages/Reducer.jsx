import { useDispatch, useSelector } from "react-redux"
import Test from "../components/Test"

export default function ReducerExample() {
  const count = useSelector(state => state.count)
  const dispatch = useDispatch()
  return (
    <div>
      <button onClick={() => dispatch({ type: 'add', payload: 2 })}>Add 2</button>
      <button onClick={() => dispatch({ type: 'add', payload: 5 })}>Add 5</button>
      <button onClick={() => dispatch({ type: 'substract' })}>Sub</button>

      <h1 className="text-2xl">{count}</h1>
      <Test />
    </div>
  )
}