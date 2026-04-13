import { adminFetch } from './adminApi';
import type {
    ApplicationStatus,
    CreateApplicationPayload,
    LoanApplication,
} from '../types/application.types';

const API_URL = import.meta.env.VITE_API_URL;

function getUserToken() {
    return localStorage.getItem('token');
}

async function parseResponse<T>(res: Response): Promise<T> {
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data?.message || 'Request failed');
    }

    return data as T;
}

export async function createApplication(payload: CreateApplicationPayload) {
    const token = getUserToken();

    const res = await fetch(`${API_URL}/applications${token ? '/auth' : ''}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
    });

    return parseResponse<LoanApplication>(res);
}

export async function getApplications() {
    return adminFetch<LoanApplication[]>('/applications');
}

export async function getApplicationById(id: number) {
    return adminFetch<LoanApplication>(`/applications/${id}`);
}

export async function updateApplicationStatus(
    id: number,
    payload: { status: ApplicationStatus; managerComment?: string },
) {
    return adminFetch<LoanApplication>(`/applications/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
    });
}