export interface RegisterProps {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: 'user' | 'local_body';
    checkbox: boolean;
}

export interface User {
    id: number;
    fullName: string;
    email: string;
    role: 'user' | 'local_body';
    password: string;
}

export interface LoginProps {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    message: string;
    id: number;
}

export interface OTPVerifyData{
    token: string;
    email: string;
    otp: string;
}
