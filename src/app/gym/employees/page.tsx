"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCheck, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import api from "@/lib/api";
import { Employee } from "@/types";
import { formatDate, formatCurrency } from "@/utils/format";

export default function GymEmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/employees");
        setEmployees(Array.isArray(response.data) ? response.data : response.data.employees || []);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
        setEmployees([
          {
            id: "1",
            name: "Mike Johnson",
            email: "mike@gym.com",
            phone: "+1234567890",
            position: "Trainer",
            salary: 3000,
            joinDate: "2024-01-15"
          },
          {
            id: "2",
            name: "Sarah Wilson",
            email: "sarah@gym.com", 
            phone: "+1234567891",
            position: "Receptionist",
            salary: 2500,
            joinDate: "2024-01-10"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
            <p className="text-gray-600">Manage your gym staff</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/gym/employees/add">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Employee
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">{employees.length} Total Employees</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{employee.name}</CardTitle>
                  <Badge variant="default">{employee.position}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">{employee.email}</p>
                  <p className="text-gray-600">{employee.phone}</p>
                  <p className="font-medium">{formatCurrency(employee.salary)}/month</p>
                  <p className="text-gray-500">Joined: {formatDate(employee.joinDate || employee.createdAt || '')}</p>
                  {employee.updatedAt && employee.updatedAt !== employee.createdAt && (
                    <p className="text-xs text-gray-400">Updated: {formatDate(employee.updatedAt)}</p>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Record Attendance
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <UserCheck className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No employees found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? "Try adjusting your search" : "Get started by adding your first employee"}
            </p>
            {!searchTerm && (
              <div className="mt-6">
                <Link href="/gym/employees/add">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Employee
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}