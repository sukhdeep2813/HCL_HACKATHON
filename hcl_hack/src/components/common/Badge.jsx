import clsx from 'clsx'

const variantClasses = {
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  danger: 'bg-danger/15 text-danger',
  info: 'bg-primary/15 text-primary',
}

const Badge = ({ children, variant = 'info', className = '' }) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
        variantClasses[variant] ?? variantClasses.info,
        className,
      )}
    >
      {children}
    </span>
  )
}

export default Badge


