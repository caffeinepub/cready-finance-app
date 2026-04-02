import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../contexts/AppContext";

const INCOME_RANGES = [
  { value: "<3L", label: "Below ₹3 Lakh" },
  { value: "3-5L", label: "₹3 Lakh – ₹5 Lakh" },
  { value: "5-10L", label: "₹5 Lakh – ₹10 Lakh" },
  { value: "10-25L", label: "₹10 Lakh – ₹25 Lakh" },
  { value: ">25L", label: "Above ₹25 Lakh" },
];

export function LoginScreen() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pan, setPan] = useState("");
  const [incomeRange, setIncomeRange] = useState("");

  const { setScreen } = useApp();

  function handleProceed() {
    if (tab === "signup") {
      if (!name || !email || !mobile || !pan || !incomeRange) {
        toast.error("Please complete all fields to register.");
        return;
      }
    }
    toast.success("Welcome to Cready!");
    setScreen("dashboard");
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "oklch(0.965 0.006 240)" }}
    >
      {/* Hero band */}
      <div
        className="px-6 pt-12 pb-10 flex flex-col items-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.38 0.16 258) 0%, oklch(0.52 0.18 248) 100%)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold text-xl">
            C
          </div>
          <span className="text-white font-bold text-2xl tracking-tight">
            Cready
          </span>
        </div>
        <p className="text-white/80 text-sm text-center max-w-xs">
          India's smart financial marketplace
        </p>
      </div>

      {/* Card */}
      <div className="flex-1 flex flex-col items-center px-4 -mt-6">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-card p-6">
          {/* Tabs */}
          <div className="flex rounded-xl overflow-hidden border border-border mb-6">
            <button
              type="button"
              onClick={() => setTab("login")}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                tab === "login"
                  ? "bg-primary text-primary-foreground"
                  : "bg-white text-muted-foreground"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setTab("signup")}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                tab === "signup"
                  ? "bg-primary text-primary-foreground"
                  : "bg-white text-muted-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          {tab === "login" ? (
            <div className="space-y-4">
              <div>
                <Label className="text-xs font-semibold text-muted-foreground mb-1 block">
                  Email
                </Label>
                <Input
                  type="email"
                  placeholder="yourname@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
              </div>
              <p className="text-xs text-muted-foreground bg-muted rounded-lg p-3">
                <Shield size={12} className="inline mr-1" />
                Demo mode — click Continue to explore the app.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label className="text-xs font-semibold text-muted-foreground mb-1 block">
                  Full Name
                </Label>
                <Input
                  placeholder="Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-muted-foreground mb-1 block">
                  Email
                </Label>
                <Input
                  type="email"
                  placeholder="rahul@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-muted-foreground mb-1 block">
                  Mobile Number
                </Label>
                <Input
                  placeholder="9876543210"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="h-11"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-muted-foreground mb-1 block">
                  PAN Number
                </Label>
                <Input
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  value={pan}
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                  className="h-11 font-mono"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-muted-foreground mb-1 block">
                  Annual Income
                </Label>
                <Select onValueChange={setIncomeRange} value={incomeRange}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select income range" />
                  </SelectTrigger>
                  <SelectContent>
                    {INCOME_RANGES.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <Button
            className="w-full mt-6 h-12 text-sm font-semibold rounded-xl"
            onClick={handleProceed}
          >
            {tab === "login" ? "Continue" : "Create Account"}
          </Button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Secured by Internet Computer Protocol
          </p>
        </div>
      </div>

      <footer className="py-6 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
