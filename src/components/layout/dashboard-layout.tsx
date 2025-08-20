"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Sidebar } from "./sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  requiredRole: "admin" | "gym";
}

export function DashboardLayout({ children, requiredRole }: DashboardLayoutProps) {
  const { user, token, isInitialized, initAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    if (!isInitialized) return;

    if (!token || !user) {
      router.push(requiredRole === "admin" ? "/admin/login" : "/gym/login");
      return;
    }

    if (user.role !== requiredRole) {
      router.push(user.role === "admin" ? "/admin/dashboard" : "/gym/dashboard");
      return;
    }
  }, [token, user, requiredRole, router, isInitialized]);

  if (!isInitialized || !token || !user || user.role !== requiredRole) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole={requiredRole} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}