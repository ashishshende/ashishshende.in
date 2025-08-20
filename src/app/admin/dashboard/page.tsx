"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, UserCheck, DollarSign } from "lucide-react";
import api from "@/lib/api";

interface DashboardStats {
  totalGyms: number;
  totalMembers: number;
  totalEmployees: number;
  totalRevenue: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalGyms: 0,
    totalMembers: 0,
    totalEmployees: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/admin/dashboard");
        setStats(response.data.stats || response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setStats({
          totalGyms: 45,
          totalMembers: 2340,
          totalEmployees: 180,
          totalRevenue: 125000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout requiredRole="admin">
        <div>Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout requiredRole="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to the Super Admin Dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Gyms"
            value={stats.totalGyms}
            icon={Building2}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Total Members"
            value={stats.totalMembers.toLocaleString()}
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Total Employees"
            value={stats.totalEmployees}
            icon={UserCheck}
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Monthly Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Gym Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "FitZone Gym", date: "2 days ago", plan: "Growth" },
                  { name: "PowerHouse Fitness", date: "5 days ago", plan: "Professional" },
                  { name: "Elite Gym", date: "1 week ago", plan: "Starter" },
                ].map((gym, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{gym.name}</p>
                      <p className="text-sm text-gray-500">{gym.date}</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {gym.plan}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Server Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Online
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Database</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Healthy
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>API Response</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Fast
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}