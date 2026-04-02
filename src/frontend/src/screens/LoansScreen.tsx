import { Button } from "@/components/ui/button";
import {
  BadgeIndianRupee,
  CircleDollarSign,
  Clock,
  Loader2,
  Percent,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductType } from "../backend";
import { AppShell } from "../components/AppShell";
import { useApp } from "../contexts/AppContext";
import { type LoanProduct, businessLoans, personalLoans } from "../data/loans";
import { useActor } from "../hooks/useActor";

const FILTERS = [
  "All",
  "Low Interest",
  "High Amount",
  "Quick Approval",
  "No Processing Fee",
];

function LoanCard({ loan }: { loan: LoanProduct }) {
  const [applying, setApplying] = useState(false);
  const { actor, isFetching } = useActor();
  const { refetchApplications } = useApp();

  async function handleApply() {
    if (!actor || isFetching) return;
    setApplying(true);
    try {
      const pType =
        loan.type === "personal"
          ? ProductType.personalLoan
          : ProductType.businessLoan;
      await actor.submitApplication(
        pType,
        loan.lender,
        `${loan.lender} ${loan.type === "personal" ? "Personal" : "Business"} Loan`,
      );
      await refetchApplications();
      toast.success(`Application submitted to ${loan.lender}!`);
    } catch (e) {
      toast.error("Failed to submit application. Please try again.");
      console.error(e);
    } finally {
      setApplying(false);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-border shadow-xs p-4">
      {/* Lender header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ background: loan.color }}
        >
          {loan.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">
            {loan.lender}
          </p>
          <p className="text-[10px] text-muted-foreground">
            {loan.type === "personal" ? "Personal Loan" : "Business Loan"}
          </p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-muted rounded-lg p-2">
          <div className="flex items-center gap-1 mb-0.5">
            <Percent size={10} className="text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">
              Interest Rate
            </span>
          </div>
          <p className="text-xs font-semibold text-primary">
            {loan.interestRate}
          </p>
        </div>
        <div className="bg-muted rounded-lg p-2">
          <div className="flex items-center gap-1 mb-0.5">
            <BadgeIndianRupee size={10} className="text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">
              Loan Amount
            </span>
          </div>
          <p className="text-xs font-semibold text-foreground">
            {loan.minAmount} – {loan.maxAmount}
          </p>
        </div>
        <div className="bg-muted rounded-lg p-2">
          <div className="flex items-center gap-1 mb-0.5">
            <Clock size={10} className="text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">Tenure</span>
          </div>
          <p className="text-xs font-semibold text-foreground">{loan.tenure}</p>
        </div>
        <div className="bg-muted rounded-lg p-2">
          <div className="flex items-center gap-1 mb-0.5">
            <CircleDollarSign size={10} className="text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">
              Processing Fee
            </span>
          </div>
          <p className="text-xs font-semibold text-foreground">
            {loan.processingFee}
          </p>
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground mb-3">
        Eligibility: {loan.eligibility}
      </p>

      <Button
        data-ocid="loan.apply.button"
        className="w-full h-9 text-xs font-semibold rounded-lg"
        variant="outline"
        style={{
          borderColor: "oklch(0.46 0.16 255)",
          color: "oklch(0.46 0.16 255)",
        }}
        onClick={handleApply}
        disabled={applying}
      >
        {applying ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
        ) : null}
        {applying ? "Applying..." : "Apply Now"}
      </Button>
    </div>
  );
}

export function LoansScreen() {
  const [loanTab, setLoanTab] = useState<"personal" | "business">("personal");
  const [activeFilter, setActiveFilter] = useState("All");

  const source = loanTab === "personal" ? personalLoans : businessLoans;
  const filtered =
    activeFilter === "All"
      ? source
      : source.filter((l) => l.tags.includes(activeFilter));

  return (
    <AppShell showBack backTo="dashboard" title="Loans">
      {/* Sub-tabs */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex rounded-xl overflow-hidden border border-border">
          <button
            type="button"
            data-ocid="loans.personal.tab"
            onClick={() => setLoanTab("personal")}
            className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
              loanTab === "personal"
                ? "bg-primary text-primary-foreground"
                : "bg-white text-muted-foreground"
            }`}
          >
            Personal Loans
          </button>
          <button
            type="button"
            data-ocid="loans.business.tab"
            onClick={() => setLoanTab("business")}
            className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
              loanTab === "business"
                ? "bg-primary text-primary-foreground"
                : "bg-white text-muted-foreground"
            }`}
          >
            Business Loans
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-2">
        <p className="text-xs font-semibold text-foreground mb-2">
          Quick Filters
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {FILTERS.map((f) => (
            <button
              type="button"
              key={f}
              data-ocid="loans.filter.tab"
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                activeFilter === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-white text-muted-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Loan cards */}
      <div className="px-4 pb-4 space-y-3">
        {filtered.length === 0 ? (
          <div data-ocid="loans.empty_state" className="py-12 text-center">
            <p className="text-sm text-muted-foreground">
              No loans match this filter.
            </p>
          </div>
        ) : (
          filtered.map((loan, i) => (
            <div key={loan.id} data-ocid={`loans.item.${i + 1}`}>
              <LoanCard loan={loan} />
            </div>
          ))
        )}
      </div>
    </AppShell>
  );
}
