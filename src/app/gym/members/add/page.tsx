"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/api";

const memberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  membershipPlan: z.string().min(1, "Please select a membership plan"),
  emergencyContact: z.string().min(10, "Emergency contact is required"),
});

type MemberFormData = z.infer<typeof memberSchema>;

const membershipPlans = [
  { value: "basic", label: "Basic - $29/month" },
  { value: "premium", label: "Premium - $49/month" },
  { value: "vip", label: "VIP - $79/month" },
];

export default function AddMemberPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
  });

  const onSubmit = async (data: MemberFormData) => {
    setIsLoading(true);
    try {
      await api.post("/members", data);
      alert("Member added successfully!");
      router.push("/gym/members");
    } catch (error) {
      console.error("Failed to add member:", error);
      alert("Failed to add member. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout requiredRole="gym">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add New Member</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <Input
                  {...register("name")}
                  placeholder="Enter member's full name"
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
                <label className="block text-sm font-medium mb-1">Membership Plan</label>
                <select
                  {...register("membershipPlan")}
                  className={`w-full p-2 border rounded-md ${errors.membershipPlan ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select a plan</option>
                  {membershipPlans.map((plan) => (
                    <option key={plan.value} value={plan.value}>
                      {plan.label}
                    </option>
                  ))}
                </select>
                {errors.membershipPlan && (
                  <p className="text-red-500 text-sm mt-1">{errors.membershipPlan.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Emergency Contact</label>
                <Input
                  {...register("emergencyContact")}
                  placeholder="Enter emergency contact number"
                  className={errors.emergencyContact ? "border-red-500" : ""}
                />
                {errors.emergencyContact && (
                  <p className="text-red-500 text-sm mt-1">{errors.emergencyContact.message}</p>
                )}
              </div>

              <div className="flex space-x-4 pt-4">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? "Adding Member..." : "Add Member"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => router.push("/gym/members")}
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