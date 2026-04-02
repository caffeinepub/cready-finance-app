import { CreditCard, Home, Landmark, TrendingUp, User } from "lucide-react";
import { type Screen, useApp } from "../contexts/AppContext";

const tabs: { id: Screen; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Home", icon: Home },
  { id: "loans", label: "Loans", icon: Landmark },
  { id: "creditCards", label: "Cards", icon: CreditCard },
  { id: "creditScore", label: "Score", icon: TrendingUp },
  { id: "profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const { screen, setScreen } = useApp();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-border z-50 flex">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = screen === tab.id;
        return (
          <button
            type="button"
            key={tab.id}
            data-ocid={`nav.${tab.id}.tab`}
            onClick={() => setScreen(tab.id)}
            className={`flex-1 flex flex-col items-center py-2.5 gap-0.5 text-[10px] font-medium transition-colors ${
              active
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
