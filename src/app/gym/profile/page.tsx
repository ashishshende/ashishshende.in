"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth";
import api from "@/lib/api";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  timezone: z.string().min(1, "Please select a timezone"),
  currency: z.string().min(1, "Please select a currency"),
});

const timezones = [
  { value: "UTC", label: "UTC" },
  { value: "Asia/Kolkata", label: "India (IST)" },
  { value: "America/New_York", label: "US Eastern" },
  { value: "America/Los_Angeles", label: "US Pacific" },
  { value: "Europe/London", label: "UK (GMT)" },
  { value: "Asia/Dubai", label: "UAE (GST)" },
];

const currencies = [
  { value: "USD", label: "US Dollar ($)", symbol: "$" },
  { value: "INR", label: "Indian Rupee (₹)", symbol: "₹" },
  { value: "EUR", label: "Euro (€)", symbol: "€" },
  { value: "GBP", label: "British Pound (£)", symbol: "£" },
  { value: "AED", label: "UAE Dirham (د.إ)", symbol: "د.إ" },
];

const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function GymProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const { user } = useAuthStore();
  
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/gym/profile");
        const profile = response.data;
        reset({
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
          timezone: profile.preferences?.timezone || "UTC",
          currency: profile.preferences?.currency || "USD"
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        if (user) {
          reset({
            name: user.name || "",
            email: user.email,
            phone: "",
            address: "",
            timezone: "UTC",
            currency: "USD"
          });
        }
      }
    };

    fetchProfile();
  }, [reset, user]);

  const onProfileSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      await api.put("/gym/profile", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        preferences: {
          timezone: data.timezone,
          currency: data.currency
        }
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    setPasswordLoading(true);
    try {
      await api.put("/gym/profile/password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      alert("Password updated successfully!");
      resetPassword();
    } catch (error) {
      console.error("Failed to update password:", error);
      alert("Failed to update password. Please check your current password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <DashboardLayout requiredRole="gym">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600">Manage your gym information and account settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Gym Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Gym Name</label>
                  <Input
                    {...registerProfile("name")}
                    placeholder="Enter gym name"
                    className={profileErrors.name ? "border-red-500" : ""}
                  />
                  {profileErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{profileErrors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    {...registerProfile("email")}
                    type="email"
                    placeholder="Enter email address"
                    className={profileErrors.email ? "border-red-500" : ""}
                  />
                  {profileErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{profileErrors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <Input
                    {...registerProfile("phone")}
                    placeholder="Enter phone number"
                    className={profileErrors.phone ? "border-red-500" : ""}
                  />
                  {profileErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{profileErrors.phone.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <Input
                    {...registerProfile("address")}
                    placeholder="Enter gym address"
                    className={profileErrors.address ? "border-red-500" : ""}
                  />
                  {profileErrors.address && (
                    <p className="text-red-500 text-sm mt-1">{profileErrors.address.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Timezone</label>
                  <select
                    {...registerProfile("timezone")}
                    className={`w-full p-2 border rounded-md ${profileErrors.timezone ? "border-red-500" : "border-gray-300"}`}
                  >
                    <option value="">Select timezone</option>
                    {timezones.map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                  </select>
                  {profileErrors.timezone && (
                    <p className="text-red-500 text-sm mt-1">{profileErrors.timezone.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Currency</label>
                  <select
                    {...registerProfile("currency")}
                    className={`w-full p-2 border rounded-md ${profileErrors.currency ? "border-red-500" : "border-gray-300"}`}
                  >
                    <option value="">Select currency</option>
                    {currencies.map((curr) => (
                      <option key={curr.value} value={curr.value}>
                        {curr.label}
                      </option>
                    ))}
                  </select>
                  {profileErrors.currency && (
                    <p className="text-red-500 text-sm mt-1">{profileErrors.currency.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Current Password</label>
                  <Input
                    {...registerPassword("currentPassword")}
                    type="password"
                    placeholder="Enter current password"
                    className={passwordErrors.currentPassword ? "border-red-500" : ""}
                  />
                  {passwordErrors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">{passwordErrors.currentPassword.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">New Password</label>
                  <Input
                    {...registerPassword("newPassword")}
                    type="password"
                    placeholder="Enter new password"
                    className={passwordErrors.newPassword ? "border-red-500" : ""}
                  />
                  {passwordErrors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">{passwordErrors.newPassword.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                  <Input
                    {...registerPassword("confirmPassword")}
                    type="password"
                    placeholder="Confirm new password"
                    className={passwordErrors.confirmPassword ? "border-red-500" : ""}
                  />
                  {passwordErrors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{passwordErrors.confirmPassword.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={passwordLoading}>
                  {passwordLoading ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}