import "@/index.css";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./pages/layout/Layout";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Infrastructure } from "./pages/infrastructure/Infrastructure";
import { Family } from "./pages/family/Family";
import { Automations } from "./pages/automations/Automations";
import { EnergyAnalysis } from "./pages/energy-analysis/EnergyAnalysis";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="infrastructure" element={<Infrastructure />} />
        <Route path="family" element={<Family />} />
        <Route path="automations" element={<Automations />} />
        <Route path="energy-analysis" element={<EnergyAnalysis />} />
      </Route>
    </Routes>
  );
}

export default App;
