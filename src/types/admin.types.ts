export type UserRole = 'USER' | 'ADMIN' | 'MANAGER' | 'CONTENT_MANAGER';

export interface AdminUser {
    userId: number;
    phone: string;
    role: UserRole;
    exp?: number;
    iat?: number;
}

export interface DashboardStats {
    totalApplications: number;
    newApplications: number;
    inReviewApplications: number;
    approvedApplications: number;
    rejectedApplications: number;
    totalUsers: number;
    latestApplications: LatestApplication[];
}

export interface LatestApplication {
    id: number;
    fullName: string;
    phone: string;
    amount: number;
    status: string;
    createdAt: string;
    user?: {
        id: number;
        firstName: string;
        lastName: string;
        phone: string;
    } | null;
    assignedTo?: {
        id: number;
        firstName: string;
        lastName: string;
        phone?: string;
        role?: string;
    } | null;
}