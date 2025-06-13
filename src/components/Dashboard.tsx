
import { useUser } from "@/contexts/UserContext";
import { Sidebar } from "@/components/Sidebar";
import { AdminDashboard } from "@/components/dashboards/AdminDashboard";
import { SellerDashboard } from "@/components/dashboards/SellerDashboard";
import { TrainerDashboard } from "@/components/dashboards/TrainerDashboard";
import { DistributorDashboard } from "@/components/dashboards/DistributorDashboard";
import { useState } from "react";

export const Dashboard = () => {
  const { currentUser } = useUser();
  const [activeSection, setActiveSection] = useState("dashboard");

  if (!currentUser) return null;

  const renderDashboard = () => {
    switch (currentUser.role) {
      case "sys-admin":
        return <AdminDashboard activeSection={activeSection} />;
      case "seller":
        return <SellerDashboard activeSection={activeSection} />;
      case "supervisor":
        return <TrainerDashboard activeSection={activeSection} />;
      case "distributor":
        return <DistributorDashboard activeSection={activeSection} />;
      default:
        return <div>Invalid role</div>;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 overflow-y-auto">
        {renderDashboard()}
      </main>
    </div>
  );
};
