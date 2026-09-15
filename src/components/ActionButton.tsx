import type { ButtonHTMLAttributes } from 'react'

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function ActionButton({ variant = 'primary', className = '', ...props }: ActionButtonProps) {
  return <button className={`button button--${variant} ${className}`.trim()} {...props} />
}
