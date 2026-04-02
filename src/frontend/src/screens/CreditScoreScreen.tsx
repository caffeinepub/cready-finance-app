import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  Loader2,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "../components/AppShell";
import { CreditGauge, getScoreStatus } from "../components/CreditGauge";
import { useApp } from "../contexts/AppContext";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const SCORE_BREAKDOWN = [
  {
    id: "payment-history",
    label: "Payment History",
    value: "95% on-time",
    status: "Excellent",
    statusColor: "text-success",
    bg: "bg-green-50",
    detail: "Making payments on time is the #1 factor in your credit score.",
  },
  {
    id: "credit-utilization",
    label: "Credit Utilization",
    value: "28% usage",
    status: "Good",
    statusColor: "text-warning",
    bg: "bg-yellow-50",
    detail: "Aim to keep utilization below 30% for the best score impact.",
  },
  {
    id: "credit-age",
    label: "Credit Age",
    value: "4.5 years avg",
    status: "Good",
    statusColor: "text-warning",
    bg: "bg-yellow-50",
    detail: "Older accounts help. Avoid closing old credit accounts.",
  },
  {
    id: "credit-mix",
    label: "Credit Mix",
    value: "3 types",
    status: "Fair",
    statusColor: "text-orange-600",
    bg: "bg-orange-50",
    detail: "Having a mix of secured and unsecured credit helps your score.",
  },
];

const IMPROVEMENT_TIPS = [
  {
    id: "tip-1",
    icon: CheckCircle2,
    color: "text-success",
    text: "Pay all EMIs and credit card dues on time every month.",
  },
  {
    id: "tip-2",
    icon: TrendingUp,
    color: "text-primary",
    text: "Keep your credit card utilization below 30%.",
  },
  {
    id: "tip-3",
    icon: AlertCircle,
    color: "text-warning",
    text: "Avoid applying for multiple loans or cards simultaneously.",
  },
  {
    id: "tip-4",
    icon: Info,
    color: "text-primary",
    text: "Maintain older credit accounts to increase credit age.",
  },
];

export function CreditScoreScreen() {
  const { profile, setProfile } = useApp();
  const { identity } = useInternetIdentity();
  const { actor, isFetching } = useActor();
  const [refreshing, setRefreshing] = useState(false);

  const score = profile ? Number(profile.creditScore) || 750 : 750;
  const { label: scoreLabel, color: scoreColor } = getScoreStatus(score);

  async function handleRefresh() {
    if (!actor || isFetching || !identity) return;
    setRefreshing(true);
    try {
      const principal = identity.getPrincipal();
      const fetchedScore = await actor.getCreditScore(principal);
      const numScore = Number(fetchedScore);
      if (numScore > 0 && profile) {
        setProfile({ ...profile, creditScore: fetchedScore });
      }
      toast.success("Credit score refreshed!");
    } catch {
      toast.error("Could not refresh score. Using cached data.");
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <AppShell showBack backTo="dashboard" title="Credit Score">
      {/* Hero score card */}
      <div
        className="mx-4 mt-4 rounded-2xl p-5 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.38 0.16 258) 0%, oklch(0.52 0.18 248) 100%)",
        }}
      >
        <p className="text-white/80 text-xs font-medium mb-3">
          Your CIBIL Score
        </p>
        <CreditGauge score={score} size={160} strokeWidth={13} />
        <p className="text-white/60 text-[10px] mt-2">Updated: 15 May 2024</p>
      </div>

      {/* Score range bar */}
      <div className="mx-4 mt-4 bg-white rounded-xl border border-border p-4">
        <p className="text-xs font-semibold text-foreground mb-3">
          Score Range
        </p>
        <div className="flex rounded-full overflow-hidden h-2.5 gap-0.5">
          <div className="flex-1 bg-red-400 rounded-l-full" />
          <div className="flex-1 bg-orange-400" />
          <div className="flex-1 bg-yellow-400" />
          <div className="flex-1 bg-lime-500" />
          <div className="flex-1 bg-green-600 rounded-r-full" />
        </div>
        <div className="flex justify-between mt-1.5 text-[9px] text-muted-foreground">
          <span>300</span>
          <span>Poor</span>
          <span>Fair</span>
          <span>Good</span>
          <span>Excellent</span>
          <span>900</span>
        </div>
        <div className="mt-2 text-center">
          <span className="text-sm font-bold" style={{ color: scoreColor }}>
            {score} — {scoreLabel}
          </span>
        </div>
      </div>

      {/* Score breakdown */}
      <div className="mx-4 mt-4">
        <p className="text-sm font-semibold text-foreground mb-3">
          Score Breakdown
        </p>
        <div className="grid grid-cols-2 gap-2">
          {SCORE_BREAKDOWN.map((item, i) => (
            <div
              key={item.id}
              data-ocid={`score_breakdown.item.${i + 1}`}
              className={`${item.bg} rounded-xl p-3 border border-border`}
            >
              <p className="text-[11px] font-semibold text-foreground mb-1">
                {item.label}
              </p>
              <p className="text-[13px] font-bold text-foreground">
                {item.value}
              </p>
              <p
                className={`text-[10px] font-semibold ${item.statusColor} mt-0.5`}
              >
                {item.status}
              </p>
              <p className="text-[9px] text-muted-foreground mt-1 leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Improvement tips */}
      <div className="mx-4 mt-4">
        <p className="text-sm font-semibold text-foreground mb-3">
          Tips to Improve Score
        </p>
        <div className="space-y-2">
          {IMPROVEMENT_TIPS.map((tip) => {
            const Icon = tip.icon;
            return (
              <div
                key={tip.id}
                className="bg-white rounded-xl border border-border p-3 flex items-start gap-3"
              >
                <Icon size={16} className={`${tip.color} mt-0.5 shrink-0`} />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {tip.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Refresh CTA */}
      <div className="mx-4 mt-5 mb-4">
        <Button
          data-ocid="credit_score.refresh.button"
          className="w-full h-12 text-sm font-semibold rounded-xl"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          {refreshing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <TrendingUp className="mr-2 h-4 w-4" />
          )}
          {refreshing ? "Refreshing..." : "Refresh Credit Score"}
        </Button>
      </div>
    </AppShell>
  );
}
