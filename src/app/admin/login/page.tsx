"use client";

import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/forms/login-form";
import { useAuthStore } from "@/store/auth";
import api from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await api.post("/admin/login", data);
      const { token, admin } = response;
      const user = {
        id: admin.id,
        email: admin.email,
        role: "admin" as const,
        name: admin.name || "Super Admin"
      };
      setAuth(user, token);
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <LoginForm
      onSubmit={handleLogin}
      title="Super Admin Login"
      defaultCredentials={{
        email: "admin@gymsaas.com",
        password: "SuperAdmin@2025",
      }}
    />
  );
}