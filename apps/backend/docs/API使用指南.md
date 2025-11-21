# API 使用指南

## 概述

该API提供完整的用户认证系统,包括注册、登录和JWT认证保护的接口。

## 基础URL

```
http://localhost:3000/api
```

## 认证方式

使用JWT Bearer Token认证。登录成功后,在请求头中添加:

```
Authorization: Bearer <your_token_here>
```

---

## 接口列表

### 1. 用户注册

**接口地址**: `POST /api/users/register`

**是否需要认证**: 否

**请求体**:
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "Test123"
}
```

**验证规则**:
- `username`: 必填,2-20个字符
- `email`: 必填,有效的邮箱格式
- `password`: 必填,6-50个字符,必须包含字母和数字

**成功响应** (201 Created):
```json
{
  "code": 200,
  "message": "操作成功",
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "username": "testuser",
    "email": "test@example.com",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**错误响应**:
- `409 Conflict`: 邮箱已被注册或用户名已被使用
- `400 Bad Request`: 参数验证失败

---

### 2. 用户登录

**接口地址**: `POST /api/users/login`

**是否需要认证**: 否

**请求体**:
```json
{
  "email": "test@example.com",
  "password": "Test123"
}
```

**成功响应** (200 OK):
```json
{
  "code": 200,
  "message": "操作成功",
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "username": "testuser",
      "email": "test@example.com"
    }
  }
}
```

**错误响应**:
- `401 Unauthorized`: 邮箱或密码错误

---

### 3. 获取当前用户信息

**接口地址**: `GET /api/users/profile`

**是否需要认证**: 是

**请求头**:
```
Authorization: Bearer <token>
```

**成功响应** (200 OK):
```json
{
  "code": 200,
  "message": "操作成功",
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "username": "testuser",
    "email": "test@example.com",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**错误响应**:
- `401 Unauthorized`: 未登录或token无效

---

### 4. 获取所有用户列表

**接口地址**: `GET /api/users`

**是否需要认证**: 是

**请求头**:
```
Authorization: Bearer <token>
```

**成功响应** (200 OK):
```json
{
  "code": 200,
  "message": "操作成功",
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "username": "testuser",
      "email": "test@example.com",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

**错误响应**:
- `401 Unauthorized`: 未登录或token无效

---

### 5. 根据ID获取用户信息

**接口地址**: `GET /api/users/:id`

**是否需要认证**: 是

**请求头**:
```
Authorization: Bearer <token>
```

**路径参数**:
- `id`: 用户ID

**成功响应** (200 OK):
```json
{
  "code": 200,
  "message": "操作成功",
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "username": "testuser",
    "email": "test@example.com",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**错误响应**:
- `401 Unauthorized`: 未登录或token无效
- `404 Not Found`: 用户不存在

---

## 使用示例

### 使用 curl

#### 注册
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Test123"
  }'
```

#### 登录
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123"
  }'
```

#### 获取当前用户信息
```bash
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 使用 JavaScript (Fetch API)

#### 注册
```javascript
const response = await fetch('http://localhost:3000/api/users/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'testuser',
    email: 'test@example.com',
    password: 'Test123',
  }),
});

const data = await response.json();
console.log(data);
```

#### 登录
```javascript
const response = await fetch('http://localhost:3000/api/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'Test123',
  }),
});

const data = await response.json();
const token = data.data.token;

// 保存 token
localStorage.setItem('token', token);
```

#### 使用Token访问受保护的接口
```javascript
const token = localStorage.getItem('token');

const response = await fetch('http://localhost:3000/api/users/profile', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});

const data = await response.json();
console.log(data);
```

---

## 错误码说明

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 201 | 创建成功 |
| 400 | 请求参数错误 |
| 401 | 未授权,需要登录 |
| 404 | 资源不存在 |
| 409 | 资源冲突 |
| 500 | 服务器内部错误 |

---

## 注意事项

1. **密码安全**: 密码在存储前会使用bcrypt加密,不会以明文形式保存
2. **Token有效期**: JWT token默认有效期为7天
3. **跨域**: API已启用CORS,允许跨域请求
4. **参数验证**: 所有请求参数都会经过严格验证
5. **错误信息**: 所有错误都会返回友好的中文提示信息

