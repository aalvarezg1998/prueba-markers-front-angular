export interface User {
    sub: string; // username
    role: string;
    id: number;
}

export interface AuthResponse {
    token: string;
    username: string;
    role: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}
