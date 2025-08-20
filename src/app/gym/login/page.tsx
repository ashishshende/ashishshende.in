"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginForm } from "@/components/forms/login-form";
import { useAuthStore } from "@/store/auth";
import api from "@/lib/api";

export default function GymLoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await api.post("/gym/login", data);
      const { token, gym } = response;
      const user = {
        id: gym._id,
        email: gym.email,
        role: "gym" as const,
        name: gym.name,
        gymId: gym._id
      };
      setAuth(user, token);
      router.push("/gym/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleLogin} title="Gym Owner Login" />
      <div className="text-center mt-4">
        <p className="text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/gym/register" className="text-blue-600 hover:underline">
            Register your gym
          </Link>
        </p>
      </div>
    </div>
  );
}