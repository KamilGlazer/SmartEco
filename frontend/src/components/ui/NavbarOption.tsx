import * as React from "react"

import { cn } from "@/lib/utils"

type NavbarOptionProps = React.ComponentProps<"button"> & {
  icon?: React.ReactNode
  label: string
  active?: boolean
}

const NavbarOption = React.forwardRef<HTMLButtonElement, NavbarOptionProps>(
  ({ className, icon, label, active = false, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "relative flex h-11 w-full cursor-pointer items-center gap-3 overflow-hidden rounded-xl px-4 text-left text-sm font-medium transition-[color,box-shadow] duration-150 ease-out hover:font-bold hover:text-[#d7e0dc]",
          active ? "text-[#00E676]" : "text-[#8C929F]",
          active
            ? "shadow-[rgba(0,230,118,0.25)_0px_0px_18px]"
            : "shadow-none",
          className
        )}
        aria-current={active ? "page" : undefined}
        {...props}
      >
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 rounded-xl bg-[linear-gradient(90deg,rgba(0,230,118,0.22)_0%,rgba(0,230,118,0.08)_55%,rgba(0,230,118,0)_100%)] transition-opacity duration-300 ease-out",
            active ? "opacity-100" : "opacity-0"
          )}
        />
        <span
          aria-hidden
          className={cn(
            "absolute top-1/2 left-0 h-6 w-0.5 -translate-y-1/2 rounded-r bg-[#00E676] transition-[opacity,transform] duration-300 ease-out",
            active ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
          )}
        />
        {icon ? (
          <span className="relative z-10 flex shrink-0 items-center justify-center">
            {icon}
          </span>
        ) : null}
        <span className="relative z-10 truncate">{label}</span>
      </button>
    )
  }
)

NavbarOption.displayName = "NavbarOption"

export { NavbarOption }
