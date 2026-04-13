export type EmploymentStatus =
    | 'EMPLOYED'
    | 'SELF_EMPLOYED'
    | 'UNEMPLOYED'
    | 'STUDENT'
    | 'PENSIONER';

export type ApplicationStatus =
    | 'NEW'
    | 'IN_REVIEW'
    | 'APPROVED'
    | 'REJECTED';

export type ProbabilityLevel =
    | 'VERY_LOW'
    | 'LOW'
    | 'MEDIUM'
    | 'HIGH'
    | 'VERY_HIGH';

export interface ApplicationUser {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    role: string;
}

export interface LoanApplication {
    id: number;
    userId?: number | null;
    assignedToId?: number | null;

    fullName: string;
    phone: string;
    amount: number;
    termMonths: number;
    monthlyIncome?: number | null;
    workplace?: string | null;
    loanPurpose?: string | null;
    hasActiveLoans?: boolean | null;
    comment?: string | null;

    employmentStatus: EmploymentStatus;
    jobYears?: number | null;
    activeLoanMonthlyPay?: number | null;
    hasOverdueNow?: boolean | null;
    wasBlacklistedBefore?: boolean | null;
    isBlacklistedNow?: boolean | null;
    hadDelaysBefore?: boolean | null;
    monthsSinceLastDelay?: number | null;

    scoringPoints: number;
    approvalProbability: number;
    probabilityLevel: ProbabilityLevel;
    autoDecision: string;
    riskNotes: string;

    status: ApplicationStatus;
    managerComment?: string | null;

    createdAt: string;
    updatedAt: string;

    user?: ApplicationUser | null;
    assignedTo?: ApplicationUser | null;
}

export interface CreateApplicationPayload {
    fullName: string;
    phone: string;
    amount: number;
    termMonths: number;
    monthlyIncome?: number;
    workplace?: string;
    loanPurpose?: string;
    hasActiveLoans?: boolean;
    comment?: string;

    employmentStatus: EmploymentStatus;
    jobYears?: number;
    activeLoanMonthlyPay?: number;
    hasOverdueNow?: boolean;
    wasBlacklistedBefore?: boolean;
    isBlacklistedNow?: boolean;
    hadDelaysBefore?: boolean;
    monthsSinceLastDelay?: number;
}