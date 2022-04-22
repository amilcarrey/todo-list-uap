export default function Task({ task, remove, complete }) {
  return (
    <div className={`${task.finished ? 'bg-green-300' : 'bg-blue-300'} h-16 shadow-md my-2 transition-all hover:scale-105 p-2 flex justify-between items-center`}>
      <div className="text-xl text-white">
        {task.text}
      </div>
      <div className="text-white font-black">
        <button onClick={() => complete(task)} className="hover:bg-white/50 rounded-md font-black p-2 active:bg-white/75">
          {task.finished ? '↶' : '✓'}
        </button>
        <button onClick={() => remove(task)} className="hover:bg-white/50 rounded-md font-black p-2 active:bg-white/75">X</button>
      </div>
    </div>
  )
}