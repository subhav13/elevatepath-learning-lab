type ProgressBarProps = {
  value: number
  max: number
  label?: string
}

export function ProgressBar({ value, max, label = 'Progress' }: ProgressBarProps) {
  const safeMax = Math.max(max, 1)
  const percentage = Math.min(100, Math.max(0, (value / safeMax) * 100))

  return (
    <div className="progress-bar" role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
      <div className="progress-bar__fill" style={{ width: `${percentage}%` }} />
    </div>
  )
}
