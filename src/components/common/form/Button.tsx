import * as React from "react"
import { cn } from "@/lib/cn"
import { buttonVariants } from "../ui/Button.style"

type ButtonVariant = keyof typeof buttonVariants.variant
type ButtonSize = keyof typeof buttonVariants.size

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export default function Button({
  className,
  variant = "create",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        buttonVariants.base,
        buttonVariants.size[size],
        buttonVariants.variant[variant],
        className
      )}
      {...props}
    >
      {loading && (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}

      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}

      {children}

      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  )
}
