import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Application {
    status: ApplicationStatus;
    user: Principal;
    productName: string;
    productType: ProductType;
    lender: string;
}
export interface Profile {
    id: Principal;
    pan: string;
    created: bigint;
    name: string;
    incomeRange: string;
    email: string;
    creditScore: bigint;
    mobile: string;
    lastLogin: bigint;
}
export type CreditScore = bigint;
export enum ApplicationStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum ProductType {
    creditCard = "creditCard",
    businessLoan = "businessLoan",
    personalLoan = "personalLoan"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllProfiles(): Promise<Array<Profile>>;
    getAllProfilesSortedByLatestActivity(): Promise<Array<Profile>>;
    getCallerUserProfile(): Promise<Profile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCreditScore(user: Principal): Promise<CreditScore>;
    getMyApplications(): Promise<Array<Application>>;
    getProfile(user: Principal): Promise<Profile>;
    getUserProfile(user: Principal): Promise<Profile | null>;
    isCallerAdmin(): Promise<boolean>;
    isRegistered(): Promise<boolean>;
    register(name: string, email: string, pan: string, mobile: string, incomeRange: string): Promise<void>;
    saveCallerUserProfile(profile: Profile): Promise<void>;
    submitApplication(productType: ProductType, lender: string, productName: string): Promise<void>;
    updateCreditScore(creditScore: CreditScore): Promise<void>;
    updateProfile(name: string, lastLogin: bigint | null): Promise<void>;
}
