import * as React from "react"

import { cn } from "@/lib/utils"

type PrimaryButtonProps = React.ComponentProps<"button">

const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, style, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        style={{
          boxShadow:
            "rgba(0, 230, 118, 0.3) 0px 6px 18px 0px, rgba(0, 230, 118, 0.22) 0px 0px 12px 2px",
          ...style,
        }}
        className={cn(
          "inline-flex items-center cursor-pointer justify-center rounded-lg bg-[#00E676] px-4 py-2 text-sm font-bold text-black transition-transform duration-100 ease-out hover:brightness-95 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      />
    )
  }
)

PrimaryButton.displayName = "PrimaryButton"

export { PrimaryButton }
