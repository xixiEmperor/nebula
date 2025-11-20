export interface ApiSuccess<T> {
    code: number;
    message: string;
    data: T;
    success: true;
}
export interface ApiError {
    code: number;
    message: string;
    success: false;
    timestamp: string;
}
export type ApiResponse<T> = ApiSuccess<T> | ApiError;
export interface UserRecord {
    _id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface UserSummary {
    id: string;
    username: string;
    email: string;
}
export interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface LoginResponse {
    token: string;
    user: UserSummary;
}
export interface UserResponse {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
