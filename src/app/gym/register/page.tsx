"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/api";

const registerSchema = z.object({
  name: z.string().min(2, "Gym name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  subscriptionPlan: z.string().min(1, "Please select a subscription plan"),
});

const subscriptionPlans = [
  { value: "starter", label: "Starter - ₹1,500/month", description: "25 members, 2 staff" },
  { value: "growth", label: "Growth - ₹3,900/month", description: "150 members, 8 staff" },
  { value: "professional", label: "Professional - ₹7,900/month", description: "500 members, 20 staff" },
  { value: "enterprise", label: "Enterprise - ₹15,900/month", description: "Unlimited everything" },
];

type RegisterFormData = z.infer<typeof registerSchema>;

export default function GymRegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await api.post("/gym/register", data);
      alert("Registration successful! Please login with your credentials.");
      router.push("/gym/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Register Your Gym</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                {...register("name")}
                placeholder="Gym Name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <Input
                {...register("email")}
                type="email"
                placeholder="Email"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <Input
                {...register("password")}
                type="password"
                placeholder="Password"
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            
            <div>
              <Input
                {...register("phone")}
                placeholder="Phone Number"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
            
            <div>
              <Input
                {...register("address")}
                placeholder="Address"
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>
            
            <div>
              <select
                {...register("subscriptionPlan")}
                className={`w-full p-2 border rounded-md ${errors.subscriptionPlan ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Select Subscription Plan</option>
                {subscriptionPlans.map((plan) => (
                  <option key={plan.value} value={plan.value}>
                    {plan.label} - {plan.description}
                  </option>
                ))}
              </select>
              {errors.subscriptionPlan && (
                <p className="text-red-500 text-sm mt-1">{errors.subscriptionPlan.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register Gym"}
            </Button>
          </form>
          
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/gym/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}