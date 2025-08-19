import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 ease-spring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-brand-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
  {
    variants: {
      variant: {
        default:
          "gradient-brand text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-gradient-to-r from-error-500 to-error-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-error-400/50",
        outline:
          "glass-button border border-white/20 text-text-primary hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "glass-card-elevated text-text-primary hover:bg-white/15 hover:scale-[1.02] active:scale-[0.98]",
        ghost:
          "bg-transparent text-text-secondary hover:bg-white/10 hover:text-text-primary hover:scale-[1.02] active:scale-[0.98]",
        link: "text-brand-400 underline-offset-4 hover:underline hover:text-brand-300",
        accent:
          "gradient-accent text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-accent-400/50",
        success:
          "bg-gradient-to-r from-success-500 to-success-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-success-400/50",
      },
      size: {
        default: "h-11 px-6 py-3 rounded-xl text-base",
        sm: "h-9 px-4 py-2 rounded-lg text-sm",
        lg: "h-14 px-8 py-4 rounded-xl text-lg",
        xl: "h-16 px-10 py-5 rounded-2xl text-xl",
        icon: "size-11 rounded-xl",
        "icon-sm": "size-9 rounded-lg",
        "icon-lg": "size-14 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
