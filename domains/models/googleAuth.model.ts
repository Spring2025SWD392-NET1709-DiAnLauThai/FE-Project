export interface GoogleAuthResponse {
    url: string;
    message: string;
}

export interface GoogleCallbackResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
        picture?: string;
    };
}

export interface UserInfo {
    id: string;
    email: string;
    name: string;
    picture?: string;
}