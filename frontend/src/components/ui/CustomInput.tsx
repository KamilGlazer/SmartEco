import * as React from "react"

import { cn } from "@/lib/utils"

import { Input } from "@/components/ui/input"

type CustomInputProps = Omit<React.ComponentProps<"input">, "placeholder"> & {
  icon?: React.ReactNode
  placeholder?: string
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, icon, placeholder, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-10 w-full items-center gap-4 rounded-xl border border-[#3B3E45] bg-[#151515] px-4",
          className
        )}
      >
        {icon ? (
          <span className="flex shrink-0 items-center text-[#AAB3A0]">{icon}</span>
        ) : null}
        <Input
          ref={ref}
          placeholder={placeholder}
          className="h-auto border-0 bg-transparent p-0 pl-0.5 text-4xl text-[#C3C9BD] placeholder:text-[#AAB3A0] focus-visible:border-0 focus-visible:ring-0"
          {...props}
        />
      </div>
    )
  }
)

CustomInput.displayName = "CustomInput"

export { CustomInput }
