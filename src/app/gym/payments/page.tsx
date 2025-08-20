"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { Payment } from "@/types";

export default function GymPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await api.get("/payments");
        setPayments(Array.isArray(response.data) ? response.data : response.data.payments || []);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
        setPayments([
          {
            id: "1",
            type: "membership",
            amount: 49,
            date: "2024-01-15",
            memberId: "mem1"
          },
          {
            id: "2",
            type: "salary",
            amount: 3000,
            date: "2024-01-10",
            employeeId: "emp1"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const filteredPayments = payments.filter(payment => 
    filterType === "all" || payment.type === filterType
  );

  const totalRevenue = payments
    .filter(p => p.type === "membership")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalExpenses = payments
    .filter(p => p.type === "salary")
    .reduce((sum, p) => sum + p.amount, 0);

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
            <h1 className="text-3xl font-bold text-gray-900">Payments & Billing</h1>
            <p className="text-gray-600">Track all payments and expenses</p>
          </div>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₹{totalRevenue.toLocaleString('en-IN')}</div>
              <p className="text-sm text-gray-500">From memberships</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">₹{totalExpenses.toLocaleString('en-IN')}</div>
              <p className="text-sm text-gray-500">Staff salaries</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Net Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                ₹{(totalRevenue - totalExpenses).toLocaleString('en-IN')}
              </div>
              <p className="text-sm text-gray-500">This month</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border rounded-md px-3 py-1"
            >
              <option value="all">All Payments</option>
              <option value="membership">Membership Payments</option>
              <option value="salary">Salary Payments</option>
            </select>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <CreditCard className="w-8 h-8 text-gray-400" />
                    <div>
                      <p className="font-medium">
                        {payment.type === "membership" ? "Membership Payment" : "Salary Payment"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(payment.date || payment.paymentDate || payment.createdAt).toLocaleDateString()}
                      </p>
                      {payment.updatedAt && payment.updatedAt !== payment.createdAt && (
                        <p className="text-xs text-gray-400">Updated: {new Date(payment.updatedAt).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant={payment.type === "membership" ? "default" : "secondary"}>
                      {payment.type}
                    </Badge>
                    <span className={`font-bold ${
                      payment.type === "membership" ? "text-green-600" : "text-red-600"
                    }`}>
                      {payment.type === "membership" ? "+" : "-"}₹{payment.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {filteredPayments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No payments found for the selected filter
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}