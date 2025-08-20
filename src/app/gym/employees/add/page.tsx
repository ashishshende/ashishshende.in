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

const employeeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  position: z.string().min(1, "Please select a position"),
  salary: z.number().min(1000, "Salary must be at least $1000"),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

const positions = [
  { value: "trainer", label: "Personal Trainer" },
  { value: "receptionist", label: "Receptionist" },
  { value: "manager", label: "Manager" },
  { value: "cleaner", label: "Cleaner" },
  { value: "maintenance", label: "Maintenance" },
];

export default function AddEmployeePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = async (data: EmployeeFormData) => {
    setIsLoading(true);
    try {
      await api.post("/employees", data);
      alert("Employee added successfully!");
      router.push("/gym/employees");
    } catch (error) {
      console.error("Failed to add employee:", error);
      alert("Failed to add employee. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout requiredRole="gym">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add New Employee</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <Input
                  {...register("name")}
                  placeholder="Enter employee's full name"
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
                <label className="block text-sm font-medium mb-1">Position</label>
                <select
                  {...register("position")}
                  className={`w-full p-2 border rounded-md ${errors.position ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select a position</option>
                  {positions.map((position) => (
                    <option key={position.value} value={position.value}>
                      {position.label}
                    </option>
                  ))}
                </select>
                {errors.position && (
                  <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Monthly Salary ($)</label>
                <Input
                  {...register("salary", { valueAsNumber: true })}
                  type="number"
                  placeholder="Enter monthly salary"
                  className={errors.salary ? "border-red-500" : ""}
                />
                {errors.salary && (
                  <p className="text-red-500 text-sm mt-1">{errors.salary.message}</p>
                )}
              </div>

              <div className="flex space-x-4 pt-4">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? "Adding Employee..." : "Add Employee"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => router.push("/gym/employees")}
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