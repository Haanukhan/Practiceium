export const DEFAULT_LOGIN_REDIRECT = {
  USER: "/dashboard",
  ADMIN: "/admin/dashboard",
};

export const apiAuthPrefix = "/api/auth";

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

export const publicRoutes = ["/", "/about", "/contact"];
