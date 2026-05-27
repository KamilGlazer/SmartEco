import * as React from "react"

import { cn } from "@/lib/utils"

type SecondaryButtonProps = React.ComponentProps<"button">

const SecondaryButton = React.forwardRef<HTMLButtonElement, SecondaryButtonProps>(
  ({ className, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#242424] px-4 py-2 text-sm font-bold text-[#E5E7EB] transition-transform duration-100 ease-out hover:brightness-110 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      />
    )
  }
)

SecondaryButton.displayName = "SecondaryButton"

export { SecondaryButton }
