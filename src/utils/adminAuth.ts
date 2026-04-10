import type { AdminUser } from '../types/admin.types';

const ADMIN_TOKEN_KEY = 'admin_token';

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

export function parseJwt(token: string): AdminUser | null {
    try {
        const base64 = token.split('.')[1]
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
        const decoded = atob(padded);

        return JSON.parse(decoded);
    } catch (error) {
        console.error('JWT parse error:', error);
        return null;
    }
}

export function getAdminUser(): AdminUser | null {
    const token = getAdminToken();
    if (!token) return null;
    return parseJwt(token);
}

export function isAdminAllowed(user: AdminUser | null) {
    if (!user) return false;
    return user.role === 'ADMIN' || user.role === 'MANAGER';
}