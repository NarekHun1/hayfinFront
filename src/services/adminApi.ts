import { getAdminToken, removeAdminToken } from '../utils/adminAuth';

const API_URL = import.meta.env.VITE_API_URL;

export async function adminFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getAdminToken();

    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {}),
        },
    });

    if (res.status === 401 || res.status === 403) {
        removeAdminToken();
        throw new Error('Unauthorized');
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data?.message || 'Request failed');
    }

    return data as T;
}

export async function adminLogin(phone: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data?.message || 'Login failed');
    }

    return data;
}