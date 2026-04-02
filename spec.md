# Cready Finance App

## Current State
New project — no existing application files.

## Requested Changes (Diff)

### Add
- Full Cready financial marketplace app — Indian fintech marketplace (PaisaBazaar-style)
- Login/Signup flow: mobile OTP or email/password, profile setup (name, PAN, income range)
- Persistent login state via Motoko backend
- Dashboard (Home Screen): greeting, credit score widget, quick links, applications section with statuses, personalized offers, bottom nav
- Credit Score Screen: circular gauge/meter (720–780 range), score breakdown (Payment History, Credit Utilization, Credit Age, Credit Mix), improvement tips, refresh CTA
- Loan Listings: Personal Loans + Business Loans only; 8–10 lenders (HDFC, ICICI, SBI, Axis, Bajaj Finserv, Tata Capital, Kotak, IDFC First, Fullerton, Muthoot); filter/sort by interest rate and loan amount; Apply Now CTA
- Credit Card Listings: 8–10 cards (HDFC Regalia, SBI SimplyCLICK, Axis Flipkart, ICICI Amazon Pay, etc.); filter by No Annual Fee / Cashback / Travel / Shopping; Apply Now CTA
- Profile Screen: user details (name, email, PAN, income), application history, settings, logout
- Backend: user registration/login, store user profile, store application submissions with statuses

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Select `authorization` component for user authentication
2. Generate Motoko backend: user profile storage, application state storage, login/auth
3. Build React/TypeScript/Tailwind frontend:
   - Router with 6 screens: Login/Signup, Dashboard, Credit Score, Loans, Credit Cards, Profile
   - Blue/white PaisaBazaar-style design tokens
   - Mobile-first layout with bottom navigation bar
   - Realistic hardcoded sample data: 10 lenders, 10 credit cards
   - Circular SVG credit score gauge
   - Filter chips for loan/card listings
   - Application status tracking (Pending/Approved/Rejected)
