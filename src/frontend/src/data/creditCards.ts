export interface CreditCardProduct {
  id: string;
  name: string;
  bank: string;
  initials: string;
  color: string;
  annualFee: string;
  joiningBonus: string;
  rewardsRate: string;
  benefits: string[];
  category: string[];
}

export const creditCards: CreditCardProduct[] = [
  {
    id: "hdfc-regalia",
    name: "HDFC Regalia",
    bank: "HDFC Bank",
    initials: "HD",
    color: "#004C8C",
    annualFee: "₹2,500/year",
    joiningBonus: "10,000 reward points",
    rewardsRate: "4X reward points",
    benefits: [
      "Complimentary airport lounge access (12/year)",
      "Dining delights — up to 20% off",
      "Milestone benefits up to 15,000 bonus points",
    ],
    category: ["Travel", "Shopping"],
  },
  {
    id: "sbi-simplyclick",
    name: "SBI SimplyCLICK",
    bank: "SBI Card",
    initials: "SBI",
    color: "#2F5FA5",
    annualFee: "₹499/year",
    joiningBonus: "₹500 Amazon gift voucher",
    rewardsRate: "10X on Amazon & BookMyShow",
    benefits: [
      "Annual fee waived on ₹1 Lakh spend",
      "5X rewards on partner sites",
      "Fuel surcharge waiver",
    ],
    category: ["Cashback", "Shopping"],
  },
  {
    id: "axis-flipkart",
    name: "Axis Flipkart Card",
    bank: "Axis Bank",
    initials: "AX",
    color: "#97144D",
    annualFee: "₹500/year",
    joiningBonus: "₹500 Flipkart welcome voucher",
    rewardsRate: "5% cashback on Flipkart",
    benefits: [
      "1.5% unlimited cashback on all spends",
      "4X rewards on Myntra",
      "Fuel surcharge waiver up to ₹400/month",
    ],
    category: ["Cashback", "Shopping"],
  },
  {
    id: "icici-amazon",
    name: "ICICI Amazon Pay",
    bank: "ICICI Bank",
    initials: "IC",
    color: "#B02A37",
    annualFee: "No annual fee",
    joiningBonus: "₹400 Amazon Pay cashback",
    rewardsRate: "5% on Amazon Prime",
    benefits: [
      "2% cashback on all Amazon spends",
      "1% cashback on all other spends",
      "No joining or annual fee ever",
    ],
    category: ["Cashback", "Shopping", "No Annual Fee"],
  },
  {
    id: "amex-smartearn",
    name: "Amex SmartEarn",
    bank: "American Express",
    initials: "AE",
    color: "#016FD0",
    annualFee: "₹495/year",
    joiningBonus: "MakeMyTrip vouchers worth ₹1,000",
    rewardsRate: "10X on Zomato & BigBasket",
    benefits: [
      "5X rewards on Flipkart & Amazon",
      "Amex Experiences access",
      "Fuel convenience fee waiver",
    ],
    category: ["Cashback", "Shopping"],
  },
  {
    id: "hdfc-moneyback",
    name: "HDFC MoneyBack+",
    bank: "HDFC Bank",
    initials: "HD",
    color: "#004C8C",
    annualFee: "₹500/year",
    joiningBonus: "500 CashPoints",
    rewardsRate: "10X on Amazon & Flipkart",
    benefits: [
      "2X CashPoints on all other spends",
      "Fuel surcharge waiver",
      "Redeem points for statement credit",
    ],
    category: ["Cashback"],
  },
  {
    id: "axis-magnus",
    name: "Axis Magnus",
    bank: "Axis Bank",
    initials: "AX",
    color: "#97144D",
    annualFee: "₹12,500/year",
    joiningBonus: "25,000 EDGE Miles",
    rewardsRate: "12 EDGE Miles per ₹200",
    benefits: [
      "Unlimited domestic + international lounge access",
      "Luxury hotel benefits & upgrades",
      "Concierge service 24x7",
    ],
    category: ["Travel"],
  },
  {
    id: "icici-coral",
    name: "ICICI Coral",
    bank: "ICICI Bank",
    initials: "IC",
    color: "#B02A37",
    annualFee: "₹500/year",
    joiningBonus: "2,000 reward points",
    rewardsRate: "2 points per ₹100 spent",
    benefits: [
      "Buy 1 Get 1 movie offer on BookMyShow",
      "Fuel surcharge waiver",
      "Annual fee waived on ₹1.5 Lakh spend",
    ],
    category: ["Cashback"],
  },
  {
    id: "sbi-bpcl",
    name: "SBI BPCL Octane",
    bank: "SBI Card",
    initials: "SBI",
    color: "#2F5FA5",
    annualFee: "₹1,499/year",
    joiningBonus: "6,000 bonus reward points",
    rewardsRate: "7.25% value back on BPCL fuel",
    benefits: [
      "13X reward points at BPCL pumps",
      "Complimentary lounge visits",
      "Travel accident insurance cover",
    ],
    category: ["Travel"],
  },
  {
    id: "kotak-mojo",
    name: "Kotak Mojo Platinum",
    bank: "Kotak Mahindra",
    initials: "KM",
    color: "#EE2B24",
    annualFee: "No annual fee",
    joiningBonus: "2,500 Mojo points",
    rewardsRate: "2.5 Mojo points per ₹100",
    benefits: [
      "Complimentary domestic lounge access",
      "Travel accident insurance",
      "Zero joining fee",
    ],
    category: ["Travel", "No Annual Fee"],
  },
];
