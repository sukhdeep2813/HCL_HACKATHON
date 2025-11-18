import { forwardRef } from 'react'
import clsx from 'clsx'

const Input = forwardRef(function Input(
  { label, type = 'text', name, value, onChange, error, icon, placeholder, className = '', ...rest },
  ref,
) {
  const hasIcon = Boolean(icon)

  return (
    <label className="flex w-full flex-col gap-1 text-sm font-medium text-slate-700">
      {label}
      <div className="relative">
        {hasIcon && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          ref={ref}
          className={clsx(
            'w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-base text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20',
            hasIcon && 'pl-10',
            error && 'border-danger focus:border-danger focus:ring-danger/20',
            className,
          )}
          {...rest}
        />
      </div>
      {error && <span className="text-xs font-medium text-danger">{error}</span>}
    </label>
  )
})

export default Input


