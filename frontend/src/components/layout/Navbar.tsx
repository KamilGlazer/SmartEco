import { useEffect } from "react";

import logo from "@/assets/logo_v2.png";
import { NavbarOption } from "@/components/ui/NavbarOption";
import { cn } from "@/lib/utils";
import {
  LampDesk,
  LayoutGrid,
  LineChart,
  LogOut,
  Menu,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { SupportDialog } from "./SupportDialog";

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
] as const;

function isNavItemActive(pathname: string, path: string) {
  if (path === "/") {
    return pathname === "/";
  }

  return pathname === path || pathname.startsWith(`${path}/`);
}

type NavbarProps = {
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
};

function Navbar({ mobileOpen, onMobileOpenChange }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    onMobileOpenChange(false);
  }, [location.pathname, onMobileOpenChange]);

  const closeMobile = () => onMobileOpenChange(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    closeMobile();
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
    closeMobile();
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center gap-3 border-b border-white/10 bg-[#0D0D0D] px-4 md:hidden">
        <button
          type="button"
          onClick={() => onMobileOpenChange(true)}
          className="flex size-10 cursor-pointer items-center justify-center rounded-lg text-[#8C929F] transition-colors hover:bg-white/5 hover:text-white"
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" strokeWidth={1.75} />
        </button>
        <img src={logo} alt="SmartEco" className="h-8 w-auto" />
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 transition-opacity duration-200 md:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={closeMobile}
        aria-hidden={!mobileOpen}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[min(280px,85vw)] flex-col border-r border-white/10 bg-[#0D0D0D] px-3 py-6 transition-transform duration-200 ease-out md:static md:z-auto md:h-screen md:w-[260px] md:shrink-0 md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          !mobileOpen && "max-md:pointer-events-none",
        )}
      >
        <div className="mb-8 flex items-center justify-between px-4">
          <img src={logo} alt="SmartEco" className="w-full max-w-[180px] md:max-w-none" />
          <button
            type="button"
            onClick={closeMobile}
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[#8C929F] transition-colors hover:bg-white/5 hover:text-white md:hidden"
            aria-label="Close navigation menu"
          >
            <X className="size-5" strokeWidth={1.75} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1" aria-label="Main navigation">
          {MAIN_NAV_ITEMS.map(({ label, path, icon: Icon }) => (
            <NavbarOption
              key={path}
              label={label}
              active={isNavItemActive(location.pathname, path)}
              onClick={() => handleNavigate(path)}
              icon={<Icon className="size-5" strokeWidth={1.75} />}
            />
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-1 border-t border-white/10 pt-4">
          <SupportDialog />
          <NavbarOption
            label="Logout"
            icon={<LogOut className="size-5" strokeWidth={1.75} />}
            onClick={handleLogout}
          />
        </div>
      </aside>
    </>
  );
}

export { Navbar };
