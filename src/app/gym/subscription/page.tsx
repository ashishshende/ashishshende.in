"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Check, Users, UserCheck, MessageSquare, HardDrive } from "lucide-react";
import api from "@/lib/api";
import { SubscriptionPlan } from "@/types";

export default function GymSubscriptionPage() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const [plansResponse, currentResponse] = await Promise.all([
          api.get("/subscription/plans"),
          api.get("/subscription/current")
        ]);
        setPlans(Array.isArray(plansResponse.data) ? plansResponse.data : plansResponse.data.plans || []);
        setCurrentPlan(currentResponse.data);
      } catch (error) {
        console.error("Failed to fetch subscription data:", error);
        setPlans([
          {
            id: "starter",
            name: "Starter",
            price: 1500,
            yearlyPrice: 15000,
            features: ["Basic gym management", "Member tracking", "Payment processing"],
            limits: { members: 25, staff: 2, sms: 50, storage: "1GB" }
          },
          {
            id: "growth",
            name: "Growth",
            price: 3900,
            yearlyPrice: 39000,
            features: ["Everything in Starter", "Class scheduling", "Workout plans", "Reports"],
            limits: { members: 150, staff: 8, sms: 500, storage: "10GB" }
          },
          {
            id: "professional",
            name: "Professional",
            price: 7900,
            yearlyPrice: 79000,
            features: ["Everything in Growth", "Multi-location", "Marketing tools", "API access"],
            limits: { members: 500, staff: 20, sms: 2000, storage: "50GB" }
          },
          {
            id: "enterprise",
            name: "Enterprise",
            price: 15900,
            yearlyPrice: 159000,
            features: ["Everything in Professional", "White-label", "Dedicated support", "Custom integrations"],
            limits: { members: -1, staff: -1, sms: -1, storage: "Unlimited" }
          }
        ]);
        setCurrentPlan({ plan: "growth", usage: { members: 45, staff: 3 } });
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, []);

  const handleUpgrade = async (planId: string) => {
    try {
      await api.post("/subscription/upgrade", { planId });
      alert("Subscription upgraded successfully!");
      // Refresh current plan data
    } catch (error) {
      console.error("Failed to upgrade subscription:", error);
      alert("Failed to upgrade subscription. Please try again.");
    }
  };

  if (loading) {
    return (
      <DashboardLayout requiredRole="gym">
        <div>Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout requiredRole="gym">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Subscription Plans</h1>
          <p className="text-gray-600 mt-2">Choose the perfect plan for your gym</p>
        </div>

        {currentPlan && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Crown className="w-5 h-5 text-blue-600" />
                  <span>Current Plan: {currentPlan.plan}</span>
                </CardTitle>
                <Badge variant="default">Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Users className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                  <p className="text-sm text-gray-600">Members</p>
                  <p className="font-bold">{currentPlan.usage?.members || 0}/150</p>
                </div>
                <div className="text-center">
                  <UserCheck className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                  <p className="text-sm text-gray-600">Staff</p>
                  <p className="font-bold">{currentPlan.usage?.staff || 0}/8</p>
                </div>
                <div className="text-center">
                  <MessageSquare className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                  <p className="text-sm text-gray-600">SMS</p>
                  <p className="font-bold">0/500</p>
                </div>
                <div className="text-center">
                  <HardDrive className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                  <p className="text-sm text-gray-600">Storage</p>
                  <p className="font-bold">2GB/10GB</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.isArray(plans) && plans.map((plan) => (
            <Card key={plan.id} className={`relative ${
              plan.name === "Growth" ? "border-blue-500 shadow-lg" : ""
            }`}>
              {plan.name === "Growth" && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">₹{plan.price.toLocaleString('en-IN')}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-500">
                  or ₹{plan.yearlyPrice.toLocaleString('en-IN')}/year (save ₹{((plan.price * 12) - plan.yearlyPrice).toLocaleString('en-IN')})
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Members</span>
                    <span>{plan.limits.members === -1 ? "Unlimited" : plan.limits.members}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Staff</span>
                    <span>{plan.limits.staff === -1 ? "Unlimited" : plan.limits.staff}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>SMS/month</span>
                    <span>{plan.limits.sms === -1 ? "Unlimited" : plan.limits.sms}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Storage</span>
                    <span>{plan.limits.storage}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full"
                  variant={currentPlan?.plan === plan.id ? "outline" : "default"}
                  disabled={currentPlan?.plan === plan.id}
                  onClick={() => handleUpgrade(plan.id)}
                >
                  {currentPlan?.plan === plan.id ? "Current Plan" : "Upgrade"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}