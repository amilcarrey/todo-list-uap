const Button = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={[
      'bg-blue-100 rounded-full px-4 py-2 uppercase mx-2 hover:bg-blue-200 active:bg-blue-300',
      active && 'font-bold border-2 shadow-md'
    ].filter(Boolean).join(' ')}
  >
    {children}
  </button>
)

export default function Filters({ active = 0, setFilter }) {
  return (
    <div className="my-4">
      <Button active={active === 0} onClick={() => setFilter(0)}>Todas</Button>
      <Button active={active === 1} onClick={() => setFilter(1)}>Pendientes</Button>
      <Button active={active === 2} onClick={() => setFilter(2)}>Completas</Button>
    </div>
  )
}