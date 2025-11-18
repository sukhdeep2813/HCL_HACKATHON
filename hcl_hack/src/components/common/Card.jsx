import clsx from 'clsx'

const Card = ({ children, title, className = '', onClick }) => {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-lg',
        onClick && 'cursor-pointer',
        className,
      )}
      onClick={onClick}
    >
      {title && <h3 className="mb-4 text-lg font-semibold text-slate-800">{title}</h3>}
      {children}
    </div>
  )
}

export default Card


