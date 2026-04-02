import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  CreditCard,
  Landmark,
  Star,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { ApplicationStatus } from "../backend";
import { AppShell } from "../components/AppShell";
import { CreditGauge, getScoreStatus } from "../components/CreditGauge";
import { useApp } from "../contexts/AppContext";

const SAMPLE_OFFERS = [
  {
    title: "HDFC Bank Personal Loan",
    subtitle: "Pre-approved offer – 10.50% p.a.",
    badge: "Pre-approved",
    color: "#004C8C",
    initials: "HD",
  },
  {
    title: "SBI SimplyCLICK Credit Card",
    subtitle: "10X rewards on Amazon & BookMyShow",
    badge: "Featured",
    color: "#2F5FA5",
    initials: "SBI",
  },
  {
    title: "IDFC First Bank Personal Loan",
    subtitle: "Up to ₹40L at 10.49% p.a.",
    badge: "Best Rate",
    color: "#00356B",
    initials: "IF",
  },
];

function StatusIcon({ status }: { status: ApplicationStatus }) {
  if (status === ApplicationStatus.approved)
    return <CheckCircle2 size={14} className="text-success" />;
  if (status === ApplicationStatus.rejected)
    return <XCircle size={14} className="text-danger" />;
  return <Clock size={14} className="text-warning" />;
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

export function DashboardScreen() {
  const { profile, applications, setScreen, isLoadingProfile } = useApp();
  const score = profile ? Number(profile.creditScore) || 750 : 750;
  const { label: scoreLabel, color: scoreColor } = getScoreStatus(score);

  const firstName = profile?.name?.split(" ")[0] || "there";

  return (
    <AppShell>
      {/* Hero header */}
      <div
        className="px-4 pt-10 pb-20"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.38 0.16 258) 0%, oklch(0.52 0.18 248) 100%)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-xs font-medium">Good morning 👋</p>
            {isLoadingProfile ? (
              <Skeleton className="h-7 w-40 bg-white/20 mt-1" />
            ) : (
              <h1 className="text-white text-xl font-bold mt-0.5">
                Hello, {firstName}!
              </h1>
            )}
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
        </div>
      </div>

      {/* Credit Score card — overlapping hero */}
      <div className="px-4 -mt-14">
        <div
          className="bg-white rounded-2xl shadow-card p-4"
          style={{ border: "1px solid #E5E7EB" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground">
              Credit Score
            </span>
            <button
              type="button"
              data-ocid="dashboard.creditscore.button"
              onClick={() => setScreen("creditScore")}
              className="text-xs text-primary font-medium flex items-center gap-1"
            >
              View Details <ArrowRight size={12} />
            </button>
          </div>
          {isLoadingProfile ? (
            <div className="flex justify-center py-4">
              <Skeleton className="w-36 h-20 rounded-full" />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <CreditGauge score={score} size={130} strokeWidth={11} />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Your score is</p>
                <p className="text-lg font-bold" style={{ color: scoreColor }}>
                  {scoreLabel}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  Updated: 15 May 2024
                </p>
                <button
                  type="button"
                  data-ocid="dashboard.refresh_score.button"
                  className="mt-2 text-[11px] text-primary border border-primary rounded-full px-3 py-1 font-medium hover:bg-primary hover:text-white transition-colors"
                  onClick={() => setScreen("creditScore")}
                >
                  Refresh Score
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="px-4 mt-5">
        <h2 className="text-sm font-semibold text-foreground mb-3">
          Quick Access
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            data-ocid="dashboard.loans.button"
            onClick={() => setScreen("loans")}
            className="bg-white rounded-xl p-4 flex flex-col items-start gap-2 shadow-xs border border-border hover:shadow-card transition-shadow text-left"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "oklch(0.92 0.04 240)" }}
            >
              <Landmark size={20} style={{ color: "oklch(0.46 0.16 255)" }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Loans</p>
              <p className="text-[11px] text-muted-foreground">
                Personal & Business
              </p>
            </div>
          </button>
          <button
            type="button"
            data-ocid="dashboard.cards.button"
            onClick={() => setScreen("creditCards")}
            className="bg-white rounded-xl p-4 flex flex-col items-start gap-2 shadow-xs border border-border hover:shadow-card transition-shadow text-left"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "oklch(0.92 0.04 240)" }}
            >
              <CreditCard size={20} style={{ color: "oklch(0.46 0.16 255)" }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Credit Cards
              </p>
              <p className="text-[11px] text-muted-foreground">
                Top cards & rewards
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Applications */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">
            Your Applications
          </h2>
          <button
            type="button"
            data-ocid="dashboard.applications.link"
            onClick={() => setScreen("profile")}
            className="text-xs text-primary font-medium flex items-center gap-1"
          >
            See all <ArrowRight size={12} />
          </button>
        </div>
        {applications.length === 0 ? (
          <div
            data-ocid="applications.empty_state"
            className="bg-white rounded-xl border border-border p-6 text-center"
          >
            <TrendingUp
              size={28}
              className="mx-auto text-muted-foreground mb-2"
            />
            <p className="text-sm text-muted-foreground">No applications yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Apply for a loan or credit card to get started
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {applications.slice(0, 3).map((app, i) => (
              <div
                key={`app-${app.lender}-${i}`}
                data-ocid={`applications.item.${i + 1}`}
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

      {/* Recommended Offers */}
      <div className="px-4 mt-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">
            Recommended For You
          </h2>
          <Star size={14} className="text-warning" />
        </div>
        <div className="space-y-2">
          {SAMPLE_OFFERS.map((offer, i) => (
            <div
              key={offer.title}
              data-ocid={`offers.item.${i + 1}`}
              className="bg-white rounded-xl border border-border p-3 flex items-center gap-3"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ background: offer.color }}
              >
                {offer.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground">
                  {offer.title}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {offer.subtitle}
                </p>
              </div>
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                style={{
                  background: "oklch(0.92 0.04 240)",
                  color: "oklch(0.46 0.16 255)",
                }}
              >
                {offer.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
