import clsx from 'clsx'

const colorMap = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
}

const ProgressBar = ({ value = 0, color = 'primary', showLabel = true, height = 'h-3' }) => {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div className="flex flex-col gap-2">
      <div className={clsx('w-full overflow-hidden rounded-full bg-slate-100', height)}>
        <div
          className={clsx('h-full rounded-full transition-all duration-500 ease-out', colorMap[color])}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && <span className="text-sm font-medium text-slate-600">{clampedValue}%</span>}
    </div>
  )
}

export default ProgressBar


