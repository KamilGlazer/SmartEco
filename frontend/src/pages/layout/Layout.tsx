import { useState } from "react";

import { Navbar } from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex h-screen overflow-hidden",
        mobileNavOpen && "max-md:overflow-hidden",
      )}
    >
      <Navbar mobileOpen={mobileNavOpen} onMobileOpenChange={setMobileNavOpen} />
      <main className="min-w-0 flex-1 overflow-auto pt-14 md:pt-0">
        <Outlet />
      </main>
    </div>
  );
};

export { Layout };
