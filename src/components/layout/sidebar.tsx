"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  CreditCard, 
  Crown, 
  Settings,
  Building2,
  BarChart3,
  LogOut
} from "lucide-react";
import { useAuthStore } from "@/store/auth";

interface SidebarProps {
  userRole: "admin" | "gym";
}

const adminMenuItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/gyms", label: "Gym Management", icon: Building2 },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

const gymMenuItems = [
  { href: "/gym/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/gym/members", label: "Members", icon: Users },
  { href: "/gym/employees", label: "Employees", icon: UserCheck },
  { href: "/gym/payments", label: "Payments", icon: CreditCard },
  { href: "/gym/subscription", label: "Subscription", icon: Crown },
  { href: "/gym/profile", label: "Profile", icon: Settings },
];

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();
  const { logout, user } = useAuthStore();
  
  const menuItems = userRole === "admin" ? adminMenuItems : gymMenuItems;

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">
          {userRole === "admin" ? "Super Admin" : (user?.name || "Gym Management")}
        </h2>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg w-full transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}