import * as React from "react"
import { cn } from "@/lib/cn"
import { buttonVariants } from "../../ui/Button.style"

type ButtonVariant = keyof typeof buttonVariants.variant
type ButtonSize = keyof typeof buttonVariants.size

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean,
}

export default function Button({
  className,
  variant = "create",
  size = "md",
  type = "button",
  loading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
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
      {children}
    </button>
  )
}
