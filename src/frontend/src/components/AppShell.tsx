import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, ChevronRight, LogOut, Search } from "lucide-react";
import type { ReactNode } from "react";
import { type Screen, useApp } from "../contexts/AppContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { BottomNav } from "./BottomNav";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function AppShell({
  children,
  showBack,
  backTo,
  title,
}: {
  children: ReactNode;
  showBack?: boolean;
  backTo?: Screen;
  title?: string;
}) {
  const { profile, setScreen, setProfile, setApplications } = useApp();
  const { clear } = useInternetIdentity();

  function handleLogout() {
    clear();
    setProfile(null);
    setApplications([]);
    setScreen("login");
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.965 0.006 240)" }}
    >
      {/* Desktop header */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-white border-b border-border h-14 items-center px-6">
        <div className="flex-1 flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-base"
            style={{ background: "oklch(0.46 0.16 255)" }}
          >
            C
          </div>
          <span
            className="font-semibold text-lg"
            style={{ color: "oklch(0.46 0.16 255)" }}
          >
            Cready
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <Bell size={18} className="text-muted-foreground" />
          </button>
          <button
            type="button"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <Search size={18} className="text-muted-foreground" />
          </button>
          {profile && (
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs font-semibold bg-primary text-primary-foreground">
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground">
                {profile.name.split(" ")[0]}
              </span>
              <Button
                data-ocid="header.logout.button"
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-xs h-7 rounded-full px-3 border-border"
              >
                <LogOut size={12} className="mr-1" />
                Log Out
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Centered mobile card */}
      <div className="flex justify-center md:pt-14">
        <div
          className="relative w-full max-w-[390px] min-h-screen bg-[#F6F8FB] overflow-x-hidden"
          style={{ boxShadow: "0 0 40px rgba(0,0,0,0.12)" }}
        >
          {/* Mobile top header */}
          {showBack && (
            <div className="sticky top-0 z-40 bg-white border-b border-border flex items-center gap-2 px-4 h-12">
              <button
                type="button"
                onClick={() => setScreen(backTo || "dashboard")}
                className="flex items-center gap-1 text-primary text-sm font-medium"
              >
                <ChevronRight size={16} className="rotate-180" />
                <span>Back</span>
              </button>
              {title && (
                <span className="text-sm font-semibold text-foreground ml-2">
                  {title}
                </span>
              )}
            </div>
          )}

          {/* Scrollable content area */}
          <main className="pb-20">{children}</main>

          {/* Bottom nav */}
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
