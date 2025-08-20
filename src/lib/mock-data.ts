// Mock data for static export
export const MOCK_GYMS = [
  {
    id: '1',
    name: 'FitZone Gym',
    email: 'contact@fitzone.com',
    phone: '+1-555-0123',
    address: '123 Fitness St, Health City, HC 12345',
    membershipPlans: ['Basic', 'Premium', 'VIP'],
    createdAt: '2024-01-15',
    status: 'active'
  },
  {
    id: '2', 
    name: 'PowerHouse Fitness',
    email: 'info@powerhouse.com',
    phone: '+1-555-0456',
    address: '456 Strength Ave, Muscle Town, MT 67890',
    membershipPlans: ['Starter', 'Pro', 'Elite'],
    createdAt: '2024-02-20',
    status: 'active'
  }
];

export const MOCK_MEMBERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1-555-1111',
    membershipType: 'Premium',
    joinDate: '2024-01-10',
    status: 'active',
    gymId: '1'
  },
  {
    id: '2',
    name: 'Jane Smith', 
    email: 'jane@example.com',
    phone: '+1-555-2222',
    membershipType: 'Basic',
    joinDate: '2024-02-15',
    status: 'active',
    gymId: '1'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com', 
    phone: '+1-555-3333',
    membershipType: 'VIP',
    joinDate: '2024-03-01',
    status: 'active',
    gymId: '2'
  }
];

export const MOCK_EMPLOYEES = [
  {
    id: '1',
    name: 'Sarah Wilson',
    email: 'sarah@fitzone.com',
    phone: '+1-555-7777',
    position: 'Personal Trainer',
    department: 'Training',
    salary: 45000,
    hireDate: '2023-06-15',
    gymId: '1'
  },
  {
    id: '2',
    name: 'David Brown',
    email: 'david@fitzone.com',
    phone: '+1-555-8888',
    position: 'Front Desk',
    department: 'Reception',
    salary: 35000,
    hireDate: '2023-08-20',
    gymId: '1'
  }
];

export const MOCK_STATS = {
  totalGyms: 2,
  totalMembers: 3,
  totalEmployees: 2,
  monthlyRevenue: 15000,
  trends: {
    gyms: 12,
    members: 8,
    employees: 5,
    revenue: 15
  }
};