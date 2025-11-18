import clsx from 'clsx'
import LoadingSpinner from './LoadingSpinner'

const variantClasses = {
  primary: 'bg-primary text-white hover:bg-primary/90 focus-visible:outline-primary',
  secondary:
    'bg-white text-primary border border-primary hover:bg-primary/10 focus-visible:outline-primary',
  danger: 'bg-danger text-white hover:bg-danger/90 focus-visible:outline-danger',
}

const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-60',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {loading && <LoadingSpinner size="sm" color={variant === 'secondary' ? 'primary' : 'white'} />}
      <span>{children}</span>
    </button>
  )
}

export default Button


