"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import api from "@/lib/api";

export default function AdminGymsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const data = await api.get("/admin/gyms");
        setGyms(data);
      } catch (error) {
        console.error("Failed to fetch gyms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGyms();
  }, []);

  const filteredGyms = gyms.filter((gym: any) =>
    gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gym.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (gymId: string) => {
    if (confirm("Are you sure you want to delete this gym?")) {
      try {
        await api.delete(`/admin/gyms/${gymId}`);
        setGyms(gyms.filter((gym: any) => gym.id !== gymId));
        alert("Gym deleted successfully!");
      } catch (error) {
        console.error("Failed to delete gym:", error);
        alert("Failed to delete gym. Please try again.");
      }
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
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gym Management</h1>
          <Button asChild>
            <Link href="/admin/gyms/add">
              <Plus className="w-4 h-4 mr-2" />
              Add New Gym
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Gyms</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search gyms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">Phone</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Created</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGyms.map((gym: any) => (
                    <tr key={gym.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{gym.name}</td>
                      <td className="p-4">{gym.email}</td>
                      <td className="p-4">{gym.phone}</td>
                      <td className="p-4">
                        <Badge variant={gym.status === 'active' ? 'default' : 'secondary'}>
                          {gym.status}
                        </Badge>
                      </td>
                      <td className="p-4">{new Date(gym.createdAt).toLocaleDateString()}</td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/gyms/edit/${gym.id}`}>
                              <Edit className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete(gym.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}