"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useParams } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/api";

const editSchema = z.object({
  name: z.string().min(2, "Gym name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  subscriptionPlan: z.string().min(1, "Please select a subscription plan"),
});

const subscriptionPlans = [
  { value: "starter", label: "Starter - ₹1,500/month" },
  { value: "growth", label: "Growth - ₹3,900/month" },
  { value: "professional", label: "Professional - ₹7,900/month" },
  { value: "enterprise", label: "Enterprise - ₹15,900/month" },
];

type EditFormData = z.infer<typeof editSchema>;

export default function AdminGymEditPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const gymId = params.id as string;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditFormData>({
    resolver: zodResolver(editSchema),
  });

  useEffect(() => {
    const fetchGym = async () => {
      try {
        const gym = await api.get(`/admin/gyms/${gymId}`);
        reset({
          name: gym.name,
          email: gym.email,
          phone: gym.phone,
          address: gym.address,
          subscriptionPlan: gym.subscriptionPlan || "starter"
        });
      } catch (error) {
        console.error("Failed to fetch gym:", error);
        alert("Failed to load gym details");
        router.push("/admin/gyms");
      } finally {
        setLoading(false);
      }
    };

    if (gymId) {
      fetchGym();
    }
  }, [gymId, reset, router]);

  const onSubmit = async (data: EditFormData) => {
    setIsLoading(true);
    try {
      await api.put(`/admin/gyms/${gymId}`, data);
      alert("Gym updated successfully!");
      router.push("/admin/gyms");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update gym. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout requiredRole="admin">
        <div>Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout requiredRole="admin">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Edit Gym Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Gym Name</label>
                <Input
                  {...register("name")}
                  placeholder="Enter gym name"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Enter email address"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <Input
                  {...register("phone")}
                  placeholder="Enter phone number"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <Input
                  {...register("address")}
                  placeholder="Enter gym address"
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Subscription Plan</label>
                <select
                  {...register("subscriptionPlan")}
                  className={`w-full p-2 border rounded-md ${errors.subscriptionPlan ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select a plan</option>
                  {subscriptionPlans.map((plan) => (
                    <option key={plan.value} value={plan.value}>
                      {plan.label}
                    </option>
                  ))}
                </select>
                {errors.subscriptionPlan && (
                  <p className="text-red-500 text-sm mt-1">{errors.subscriptionPlan.message}</p>
                )}
              </div>

              <div className="flex space-x-4 pt-4">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Gym"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => router.push("/admin/gyms")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}