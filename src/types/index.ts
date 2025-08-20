export interface User {
  id: string;
  email: string;
  role: "admin" | "gym";
  name?: string;
  gymId?: string;
}

type subscription = {
  plan: string;
  billingCycle: string;
  price: number;
  startDate: string;
  endDate: string;
  features: Array<string>;
  limits: {
    members: number;
    employees: number;
    sms: number;
    storage: number;
    locations: number;
  };
  isActive: boolean;
};

export interface Gym {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  subscription: subscription;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  emergencyContact: string;
  membershipType: string;
  joinDate: string;
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  salary: number;
  joinDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Payment {
  id: string;
  type: "membership" | "salary";
  amount: number;
  date: string;
  memberId?: string;
  employeeId?: string;
  paymentDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  yearlyPrice: number;
  features: string[];
  limits: {
    members: number;
    staff: number;
    sms: number;
    storage: string;
  };
}
