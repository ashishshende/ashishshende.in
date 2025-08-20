"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import api from "@/lib/api";
import { Member } from "@/types";
import { formatDateWithSettings } from "@/utils/format";

export default function GymMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await api.get("/members");
        setMembers(Array.isArray(response.data) ? response.data : response.data.members || []);
      } catch (error) {
        console.error("Failed to fetch members:", error);
        setMembers([
          {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            phone: "+1234567890",
            membershipPlan: "Premium",
            joinDate: "2024-01-15",
            status: "active"
          },
          {
            id: "2", 
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "+1234567891",
            membershipPlan: "Basic",
            joinDate: "2024-01-10",
            status: "active"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className="text-3xl font-bold text-gray-900">Members</h1>
            <p className="text-gray-600">Manage your gym members</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/gym/members/add">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">{members.length} Total Members</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge variant={member.status === "active" ? "default" : "secondary"}>
                    {member.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">{member.email} / {member.phone}</p>
                  <p className="text-gray-600">Emergency Contact: {member.emergencyContact}</p>
                  <p className="font-medium">Plan: {member.membershipType.toUpperCase()}</p>
                  <p className="text-gray-500">Joined: {formatDateWithSettings(member.joinDate || member.createdAt)}</p>
                  {member.updatedAt && member.updatedAt !== member.createdAt && (
                    <p className="text-xs text-gray-400">Updated: {formatDateWithSettings(member.updatedAt)}</p>
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

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No members found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? "Try adjusting your search" : "Get started by adding your first member"}
            </p>
            {!searchTerm && (
              <div className="mt-6">
                <Link href="/gym/members/add">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Member
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