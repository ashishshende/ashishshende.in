"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, DollarSign, Calendar, Plus, CheckCircle } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import { formatCurrencyWithSettings } from "@/utils/format";

interface GymDashboardStats {
  totalMembers: number;
  totalEmployees: number;
  monthlyRevenue: number;
  todayAttendance: number;
}

export default function GymDashboardPage() {
  const [stats, setStats] = useState<GymDashboardStats>({
    totalMembers: 0,
    totalEmployees: 0,
    monthlyRevenue: 0,
    todayAttendance: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        console.log('Making API call to:', '/gym/dashboard');
        console.log('Token:', localStorage.getItem('token'));
        
        const response = await api.get("/gym/dashboard");
        console.log('API Response:', response.data);
        setStats(response.data.stats);
      } catch (error) {
        console.error("API Error Details:", {
          message: error instanceof Error ? error.message : 'Unknown error',
          error
        });
        
        setStats({
          totalMembers: 156,
          totalEmployees: 8,
          monthlyRevenue: 12500,
          todayAttendance: 45,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome to your gym management dashboard</p>
          </div>
          <div className="flex space-x-3">
            <Link href="/gym/members">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Members"
            value={stats.totalMembers}
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Employees"
            value={stats.totalEmployees}
            icon={UserCheck}
            trend={{ value: 2, isPositive: true }}
          />
          <StatsCard
            title="Monthly Revenue"
            value={formatCurrencyWithSettings(stats.monthlyRevenue)}
            icon={DollarSign}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Today's Attendance"
            value={stats.todayAttendance}
            icon={Calendar}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "New member registration", member: "John Doe", time: "2 hours ago" },
                  { action: "Payment received", member: "Jane Smith", time: "4 hours ago" },
                  { action: "Employee check-in", member: "Mike Johnson", time: "6 hours ago" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.member} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Current Plan</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Growth Plan
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Members</span>
                    <span>{stats.totalMembers}/150</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(stats.totalMembers / 150) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <Link href="/gym/subscription">
                  <Button variant="outline" className="w-full">
                    Manage Subscription
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}