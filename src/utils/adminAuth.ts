import type { AdminUser, UserRole } from '../types/admin.types';

const ADMIN_TOKEN_KEY = 'admin_token';

type RawJwtPayload = {
    userId?: number;
    id?: number;
    sub?: number;
    phone?: string;
    role?: UserRole;
    user?: {
        id?: number;
        phone?: string;
        role?: UserRole;
    };
    exp?: number;
    iat?: number;
};

export function setAdminToken(token: string) {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
    window.dispatchEvent(new Event('admin-auth-changed'));
}

export function getAdminToken() {
    return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function removeAdminToken() {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    window.dispatchEvent(new Event('admin-auth-changed'));
}

export function parseJwt(token: string): RawJwtPayload | null {
    try {
        const tokenParts = token.split('.');

        if (tokenParts.length < 2) {
            return null;
        }

        const base64 = tokenParts[1]
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const padded = base64.padEnd(
            base64.length + ((4 - (base64.length % 4)) % 4),
            '=',
        );

        const decoded = atob(padded);
        return JSON.parse(decoded) as RawJwtPayload;
    } catch (error) {
        console.error('JWT parse error:', error);
        return null;
    }
}

export function getAdminUser(): AdminUser | null {
    const token = getAdminToken();
    if (!token) return null;

    const payload = parseJwt(token);
    if (!payload) return null;

    return {
        userId: payload.userId ?? payload.id ?? payload.sub ?? payload.user?.id ?? 0,
        phone: payload.phone ?? payload.user?.phone ?? '',
        role: payload.role ?? payload.user?.role ?? 'USER',
        exp: payload.exp,
        iat: payload.iat,
    };
}

export function isAdminAllowed(user: AdminUser | null) {
    if (!user) return false;
    return user.role === 'ADMIN' || user.role === 'MANAGER';
}