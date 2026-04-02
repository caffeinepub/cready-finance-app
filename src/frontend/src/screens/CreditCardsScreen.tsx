import { Button } from "@/components/ui/button";
import { CheckCircle2, Gift, Loader2, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductType } from "../backend";
import { AppShell } from "../components/AppShell";
import { useApp } from "../contexts/AppContext";
import { type CreditCardProduct, creditCards } from "../data/creditCards";
import { useActor } from "../hooks/useActor";

const CATEGORY_FILTERS = [
  "All",
  "No Annual Fee",
  "Cashback",
  "Travel",
  "Shopping",
];

function CreditCardItem({ card }: { card: CreditCardProduct }) {
  const [applying, setApplying] = useState(false);
  const { actor, isFetching } = useActor();
  const { refetchApplications } = useApp();

  async function handleApply() {
    if (!actor || isFetching) return;
    setApplying(true);
    try {
      await actor.submitApplication(
        ProductType.creditCard,
        card.bank,
        card.name,
      );
      await refetchApplications();
      toast.success(`Application submitted for ${card.name}!`);
    } catch (e) {
      toast.error("Failed to submit application. Please try again.");
      console.error(e);
    } finally {
      setApplying(false);
    }
  }

  const isNoFee = card.annualFee === "No annual fee";

  return (
    <div className="bg-white rounded-xl border border-border shadow-xs p-4">
      {/* Card header */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-12 h-8 rounded-md flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ background: card.color }}
        >
          {card.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">{card.name}</p>
          <p className="text-[10px] text-muted-foreground">{card.bank}</p>
        </div>
        {isNoFee && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 shrink-0">
            Free
          </span>
        )}
      </div>

      {/* Key details row */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-muted rounded-lg p-2">
          <p className="text-[10px] text-muted-foreground mb-0.5">Annual Fee</p>
          <p className="text-xs font-semibold text-foreground">
            {card.annualFee}
          </p>
        </div>
        <div className="bg-muted rounded-lg p-2">
          <div className="flex items-center gap-1 mb-0.5">
            <Star size={9} className="text-warning" />
            <span className="text-[10px] text-muted-foreground">Rewards</span>
          </div>
          <p className="text-xs font-semibold text-foreground">
            {card.rewardsRate}
          </p>
        </div>
      </div>

      {/* Joining bonus */}
      <div className="flex items-center gap-1.5 mb-3 text-[11px] text-muted-foreground">
        <Gift size={11} />
        <span>Welcome: {card.joiningBonus}</span>
      </div>

      {/* Benefits */}
      <ul className="space-y-1 mb-3">
        {card.benefits.map((b) => (
          <li
            key={b}
            className="flex items-start gap-1.5 text-[11px] text-muted-foreground"
          >
            <CheckCircle2 size={11} className="text-success mt-0.5 shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <Button
        data-ocid="card.apply.button"
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

export function CreditCardsScreen() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? creditCards
      : creditCards.filter((c) => c.category.includes(activeFilter));

  return (
    <AppShell showBack backTo="dashboard" title="Credit Cards">
      {/* Filters */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-xs font-semibold text-foreground mb-2">
          Filter by Category
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORY_FILTERS.map((f) => (
            <button
              type="button"
              key={f}
              data-ocid="cards.filter.tab"
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

      {/* Cards list */}
      <div className="px-4 pb-4 space-y-3">
        {filtered.length === 0 ? (
          <div data-ocid="cards.empty_state" className="py-12 text-center">
            <p className="text-sm text-muted-foreground">
              No cards match this filter.
            </p>
          </div>
        ) : (
          filtered.map((card, i) => (
            <div key={card.id} data-ocid={`cards.item.${i + 1}`}>
              <CreditCardItem card={card} />
            </div>
          ))
        )}
      </div>
    </AppShell>
  );
}
