import { http } from "@/utils/request";
import type { CreateUserRequest, LoginRequest } from "@nebula/shared";

// 注册
export const register = (data: CreateUserRequest) => {
  return http.post("/api/users/register", data);
};

// 登录
export const login = (data: LoginRequest) => {
  return http.post("/api/users/login", data);
};