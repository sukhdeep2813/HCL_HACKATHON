import clsx from 'clsx'

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-[3px]',
  lg: 'h-10 w-10 border-4',
}

const colorMap = {
  primary: 'border-primary border-t-transparent',
  success: 'border-success border-t-transparent',
  warning: 'border-warning border-t-transparent',
  danger: 'border-danger border-t-transparent',
  white: 'border-white border-t-transparent',
}

const LoadingSpinner = ({ size = 'md', color = 'primary', className = '' }) => {
  return (
    <span
      className={clsx(
        'inline-block animate-spin rounded-full border-solid',
        sizeMap[size],
        colorMap[color] ?? colorMap.primary,
        className,
      )}
      aria-label="Loading"
    />
  )
}

export default LoadingSpinner


