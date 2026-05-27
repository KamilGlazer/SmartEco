import "@/index.css"
import { NavbarOption } from "@/components/ui/NavbarOption"
import { useState } from "react"
import { HomeIcon, InfoIcon, ServerIcon } from "lucide-react"

function App() {

const ACTIVE_OPTIONS = [
  {
    label: "Home",
    value: "home",
  },
  {
    label: "About",
    value: "about",
  },
  {
    label: "Services",
    value: "services",
  },
]

const [active, setActive] = useState(ACTIVE_OPTIONS[0].value)
  return (
    <div className="min-h-screen p-6 flex gap-2 justify-center items-center">
      <div className="flex gap-4 flex-col">
            <NavbarOption icon={<HomeIcon className="w-4 h-4" />} active={active === ACTIVE_OPTIONS[0].value} onClick={() => setActive(ACTIVE_OPTIONS[0].value)} label={ACTIVE_OPTIONS[0].label} />
          <NavbarOption icon={<InfoIcon className="w-4 h-4" />} active={active === ACTIVE_OPTIONS[1].value} onClick={() => setActive(ACTIVE_OPTIONS[1].value)} label={ACTIVE_OPTIONS[1].label} />
          <NavbarOption icon={<ServerIcon className="w-4 h-4" />} active={active === ACTIVE_OPTIONS[2].value} onClick={() => setActive(ACTIVE_OPTIONS[2].value)} label={ACTIVE_OPTIONS[2].label} />
      </div>
    </div>
  )
}

export default App
