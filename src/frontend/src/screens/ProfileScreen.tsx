import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  Mail,
  Moon,
  Phone,
  Shield,
  User,
  Wallet,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ApplicationStatus } from "../backend";
import { AppShell } from "../components/AppShell";
import { useApp } from "../contexts/AppContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

function maskPan(pan: string) {
  if (!pan || pan.length < 10) return pan || "—";
  return `${pan.slice(0, 2)}XXX${pan.slice(5, 9)}${pan.slice(9)}`;
}

function StatusBadge({ status }: { status: ApplicationStatus }) {
  const map = {
    [ApplicationStatus.approved]: "bg-green-100 text-green-700",
    [ApplicationStatus.rejected]: "bg-red-100 text-red-700",
    [ApplicationStatus.pending]: "bg-yellow-100 text-yellow-700",
  };
  const label = {
    [ApplicationStatus.approved]: "Approved",
    [ApplicationStatus.rejected]: "Rejected",
    [ApplicationStatus.pending]: "Pending",
  };
  return (
    <span
      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${map[status]}`}
    >
      {label[status]}
    </span>
  );
}

function StatusIcon({ status }: { status: ApplicationStatus }) {
  if (status === ApplicationStatus.approved)
    return <CheckCircle2 size={14} className="text-success" />;
  if (status === ApplicationStatus.rejected)
    return <XCircle size={14} className="text-danger" />;
  return <Clock size={14} className="text-warning" />;
}

export function ProfileScreen() {
  const { profile, applications, setScreen, setProfile, setApplications } =
    useApp();
  const { clear } = useInternetIdentity();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  function handleLogout() {
    clear();
    setProfile(null);
    setApplications([]);
    setScreen("login");
    toast.success("Logged out successfully.");
  }

  const details = [
    { icon: User, label: "Full Name", value: profile?.name || "—" },
    { icon: Mail, label: "Email", value: profile?.email || "—" },
    { icon: Phone, label: "Mobile", value: profile?.mobile || "—" },
    {
      icon: CreditCard,
      label: "PAN Number",
      value: maskPan(profile?.pan || ""),
    },
    {
      icon: Wallet,
      label: "Annual Income",
      value: profile?.incomeRange || "—",
    },
  ];

  return (
    <AppShell showBack backTo="dashboard" title="Profile">
      {/* Avatar section */}
      <div
        className="px-4 py-6 flex flex-col items-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.38 0.16 258) 0%, oklch(0.52 0.18 248) 100%)",
        }}
      >
        <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center mb-2">
          <span className="text-white font-bold text-2xl">
            {profile?.name?.[0]?.toUpperCase() || "U"}
          </span>
        </div>
        <p className="text-white font-semibold text-base">
          {profile?.name || "User"}
        </p>
        <p className="text-white/70 text-xs mt-0.5">{profile?.email || ""}</p>
        <div
          className="mt-3 flex items-center gap-1 px-3 py-1 rounded-full"
          style={{ background: "rgba(255,255,255,0.2)" }}
        >
          <Shield size={11} className="text-white" />
          <span className="text-white text-[10px] font-medium">
            Verified Member
          </span>
        </div>
      </div>

      {/* Profile details */}
      <div className="mx-4 mt-4">
        <p className="text-sm font-semibold text-foreground mb-3">
          Personal Details
        </p>
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          {details.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                data-ocid={`profile.item.${i + 1}`}
                className={`flex items-center gap-3 px-4 py-3 ${
                  i < details.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "oklch(0.92 0.04 240)" }}
                >
                  <Icon size={15} style={{ color: "oklch(0.46 0.16 255)" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="text-xs font-semibold text-foreground truncate">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Application history */}
      <div className="mx-4 mt-5">
        <p className="text-sm font-semibold text-foreground mb-3">
          Application History
        </p>
        {applications.length === 0 ? (
          <div
            data-ocid="profile.applications.empty_state"
            className="bg-white rounded-xl border border-border p-6 text-center"
          >
            <p className="text-sm text-muted-foreground">
              No applications yet.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {applications.map((app, i) => (
              <div
                key={`${app.lender}-${app.productName}`}
                data-ocid={`profile.application.item.${i + 1}`}
                className="bg-white rounded-xl border border-border p-3 flex items-center gap-3"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: "oklch(0.46 0.16 255)" }}
                >
                  {app.lender.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">
                    {app.lender}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {app.productName}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <StatusIcon status={app.status} />
                  <StatusBadge status={app.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Settings */}
      <div className="mx-4 mt-5">
        <p className="text-sm font-semibold text-foreground mb-3">Settings</p>
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "oklch(0.92 0.04 240)" }}
            >
              <Bell size={15} style={{ color: "oklch(0.46 0.16 255)" }} />
            </div>
            <span className="text-xs font-medium text-foreground flex-1">
              Push Notifications
            </span>
            <Switch
              data-ocid="profile.notifications.switch"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
          <div className="flex items-center gap-3 px-4 py-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "oklch(0.92 0.04 240)" }}
            >
              <Moon size={15} style={{ color: "oklch(0.46 0.16 255)" }} />
            </div>
            <span className="text-xs font-medium text-foreground flex-1">
              Dark Mode
            </span>
            <Switch
              data-ocid="profile.darkmode.switch"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
        </div>
      </div>

      {/* Help & Privacy links */}
      <div className="mx-4 mt-3">
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          {["Help & Support", "Privacy Policy", "Terms of Service"].map(
            (item, i) => (
              <button
                type="button"
                key={item}
                className={`w-full flex items-center justify-between px-4 py-3 text-xs font-medium text-foreground hover:bg-muted transition-colors ${
                  i < 2 ? "border-b border-border" : ""
                }`}
              >
                <span>{item}</span>
                <ChevronRight size={14} className="text-muted-foreground" />
              </button>
            ),
          )}
        </div>
      </div>

      {/* Logout */}
      <div className="mx-4 mt-4 mb-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              data-ocid="profile.logout.open_modal_button"
              variant="destructive"
              className="w-full h-12 text-sm font-semibold rounded-xl"
            >
              Log Out
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent data-ocid="profile.logout.dialog">
            <AlertDialogHeader>
              <AlertDialogTitle>Log out of Cready?</AlertDialogTitle>
              <AlertDialogDescription>
                You will need to authenticate again to access your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel data-ocid="profile.logout.cancel_button">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                data-ocid="profile.logout.confirm_button"
                onClick={handleLogout}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Log Out
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Footer */}
      <div className="mx-4 mb-6 text-center">
        <p className="text-[10px] text-muted-foreground">
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </AppShell>
  );
}
