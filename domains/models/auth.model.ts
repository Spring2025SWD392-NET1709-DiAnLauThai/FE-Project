export type AuthPayload = {
    email: string;
    password: string;
}

export type AuthResponse = {
    token: string;
}