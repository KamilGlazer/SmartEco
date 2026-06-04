import logo from "@/assets/logo_v2.png"
import { NavbarOption } from "@/components/ui/NavbarOption"
import {
  HelpCircle,
  LampDesk,
  LayoutGrid,
  LineChart,
  LogOut,
  Users,
  Zap,
} from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

const MAIN_NAV_ITEMS = [
  { label: "Dashboard", path: "/", icon: LayoutGrid },
  { label: "Infrastructure", path: "/infrastructure", icon: LampDesk },
  { label: "Family", path: "/family", icon: Users },
  { label: "Automations", path: "/automations", icon: Zap },
  {
    label: "Energy Analysis",
    path: "/energy-analysis",
    icon: LineChart,
  },
] as const

function isNavItemActive(pathname: string, path: string) {
  if (path === "/") {
    return pathname === "/"
  }

  return pathname === path || pathname.startsWith(`${path}/`)
}

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <aside className="flex h-screen w-[260px] shrink-0 flex-col border-r border-white/10 bg-[#0D0D0D] px-3 py-6">
      <header className="mb-8 px-2">
        <img src={logo} alt="SmartEco" className="h-8 w-auto" />
      </header>

      <nav className="flex flex-1 flex-col gap-1" aria-label="Main navigation">
        {MAIN_NAV_ITEMS.map(({ label, path, icon: Icon }) => (
          <NavbarOption
            key={path}
            label={label}
            active={isNavItemActive(location.pathname, path)}
            onClick={() => navigate(path)}
            icon={<Icon className="size-5" strokeWidth={1.75} />}
          />
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-1 border-t border-white/10 pt-4">
        <NavbarOption
          label="Support"
          icon={<HelpCircle className="size-5" strokeWidth={1.75} />}
        />
        <NavbarOption
          label="Logout"
          icon={<LogOut className="size-5" strokeWidth={1.75} />}
        />
      </div>
    </aside>
  )
}

export { Navbar }
