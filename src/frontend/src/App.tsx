import { Toaster } from "@/components/ui/sonner";
import { AppProvider, useApp } from "./contexts/AppContext";
import { CreditCardsScreen } from "./screens/CreditCardsScreen";
import { CreditScoreScreen } from "./screens/CreditScoreScreen";
import { DashboardScreen } from "./screens/DashboardScreen";
import { LoansScreen } from "./screens/LoansScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { ProfileScreen } from "./screens/ProfileScreen";

function AppRouter() {
  const { screen } = useApp();

  switch (screen) {
    case "login":
    case "register":
      return <LoginScreen />;
    case "dashboard":
      return <DashboardScreen />;
    case "loans":
      return <LoansScreen />;
    case "creditCards":
      return <CreditCardsScreen />;
    case "creditScore":
      return <CreditScoreScreen />;
    case "profile":
      return <ProfileScreen />;
    default:
      return <LoginScreen />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
      <Toaster position="top-center" richColors />
    </AppProvider>
  );
}
