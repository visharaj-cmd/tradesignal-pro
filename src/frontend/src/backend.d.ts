import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ServiceId = bigint;
export type LeadId = bigint;
export interface SocialLink {
    url: string;
    platform: string;
}
export interface SubmitOrderRequest {
    cryptoType: string;
    cryptoSymbol: string;
    screenshotUrl: string;
    network: string;
    walletAddress: string;
}
export interface Service {
    id: ServiceId;
    title: string;
    sortOrder: bigint;
    description: string;
    iconName: string;
}
export interface HeroContent {
    headline: string;
    ctaText: string;
    ctaSubtext: string;
    subtitle: string;
}
export interface WhyChooseSection {
    title: string;
    features: Array<WhyChooseFeature>;
}
export interface Lead {
    id: LeadId;
    fullName: string;
    timestamp: bigint;
    contactNumber: string;
}
export interface FooterLink {
    url: string;
    text: string;
}
export interface FooterContent {
    links: Array<FooterLink>;
    copyright: string;
}
export interface ButtonLabels {
    whatsappButtonText: string;
    supportButtonText: string;
}
export interface CryptoListing {
    id: bigint;
    name: string;
    createdAt: bigint;
    description: string;
    isActive: boolean;
    price: number;
    symbol: string;
}
export interface AppSettings {
    walletNetwork: string;
    walletAddress: string;
    currency: Currency;
    upiId: string;
    paymentType: PaymentType;
    heroContent: HeroContent;
    footerContent: FooterContent;
    whyChoose: WhyChooseSection;
    buttonLabels: ButtonLabels;
}
export interface ContactDetails {
    whatsapp: string;
    email: string;
    address: string;
    phone: string;
    socialMedia: Array<SocialLink>;
}
export interface CryptoOrderPublic {
    id: bigint;
    status: OrderStatus;
    completedAt?: bigint;
    cryptoType: string;
    cryptoSymbol: string;
    userId: Principal;
    screenshotUrl: string;
    createdAt: bigint;
    network: string;
    walletAddress: string;
    reviewComment: string;
    reviewStatus: ReviewStatus;
}
export interface WhyChooseFeature {
    title: string;
    icon: string;
    description: string;
}
export enum Currency {
    INR = "INR",
    USD = "USD"
}
export enum OrderStatus {
    pending = "pending",
    completed = "completed",
    rejected = "rejected"
}
export enum PaymentType {
    UPI = "UPI",
    CryptoWallet = "CryptoWallet"
}
export enum ReviewStatus {
    trusted = "trusted",
    none = "none",
    notTrusted = "notTrusted"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addService(title: string, description: string, iconName: string, sortOrder: bigint): Promise<Service>;
    adminAddCryptoListing(name: string, symbol: string, description: string, price: number): Promise<bigint>;
    adminCompleteOrder(id: bigint): Promise<boolean>;
    adminDeleteCryptoListing(id: bigint): Promise<boolean>;
    adminListAllCryptoListings(): Promise<Array<CryptoListing>>;
    adminListAllOrders(): Promise<Array<CryptoOrderPublic>>;
    adminListPendingOrders(): Promise<Array<CryptoOrderPublic>>;
    adminRejectOrder(id: bigint): Promise<boolean>;
    adminUpdateCryptoListing(id: bigint, name: string, symbol: string, description: string, price: number, isActive: boolean): Promise<boolean>;
    adminUpdateSettings(settings: AppSettings): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    captureLead(fullName: string, contactNumber: string): Promise<Lead>;
    claimAdminRole(password: string): Promise<boolean>;
    deleteLead(id: LeadId): Promise<boolean>;
    deleteService(id: ServiceId): Promise<boolean>;
    getAppSettings(): Promise<AppSettings>;
    getCallerUserRole(): Promise<UserRole>;
    getContactDetails(): Promise<ContactDetails | null>;
    getCryptoListing(id: bigint): Promise<CryptoListing | null>;
    getLead(id: LeadId): Promise<Lead | null>;
    getMyOrders(): Promise<Array<CryptoOrderPublic>>;
    getService(id: ServiceId): Promise<Service | null>;
    isCallerAdmin(): Promise<boolean>;
    listActiveCryptoListings(): Promise<Array<CryptoListing>>;
    listLeads(): Promise<Array<Lead>>;
    listServices(): Promise<Array<Service>>;
    pollNewlyCompletedOrders(): Promise<Array<CryptoOrderPublic>>;
    selfRegister(): Promise<void>;
    setContactDetails(phone: string, whatsapp: string, email: string, address: string, socialMedia: Array<SocialLink>): Promise<ContactDetails>;
    submitCryptoOrder(req: SubmitOrderRequest): Promise<bigint>;
    submitOrderReview(orderId: bigint, reviewStatus: ReviewStatus, comment: string): Promise<boolean>;
    updateService(id: ServiceId, title: string, description: string, iconName: string, sortOrder: bigint): Promise<Service | null>;
    verifyAdminPassword(password: string): Promise<boolean>;
}
