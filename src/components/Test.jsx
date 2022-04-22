import { useSelector } from "react-redux"

export default function Test() {
  const count = useSelector(state => state.count)

  return <h1 className="text-red-500 text-2xl">{count}</h1>
}