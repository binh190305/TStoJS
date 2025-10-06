import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { PageType } from '../Dashboard';
import { Users, UserPlus, Activity, TrendingUp } from 'lucide-react';

interface AdminDashboardProps {
  onPageChange: (page: PageType) => void;
}

export function AdminDashboard({ onPageChange }: AdminDashboardProps) {
  // Mock data
  const stats = {
    totalCustomers: 24,
    activeCustomers: 18,
    totalAdmins: 3,
    newCustomersThisMonth: 5
  };

  const recentCustomers = [
    { id: '1', name: 'John Smith', email: 'john@example.com', status: 'active', joinDate: '2024-01-15' },
    { id: '2', name: 'Jane Doe', email: 'jane@example.com', status: 'active', joinDate: '2024-01-10' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', status: 'inactive', joinDate: '2024-01-05' },
    { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', status: 'active', joinDate: '2023-12-28' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage customers and system administrators</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.newCustomersThisMonth} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCustomers}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.activeCustomers / stats.totalCustomers) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAdmins}</div>
            <p className="text-xs text-muted-foreground">
              System administrators
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12%</div>
            <p className="text-xs text-muted-foreground">
              Customer growth this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Customers */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Customers</CardTitle>
            <CardDescription>Latest customer registrations</CardDescription>
          </div>
          <Button onClick={() => onPageChange('customer-list')}>
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCustomers.map((customer) => (
              <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{customer.name}</p>
                  <p className="text-sm text-muted-foreground">{customer.email}</p>
                  <p className="text-xs text-muted-foreground">Joined: {customer.joinDate}</p>
                </div>
                <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                  {customer.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2"
              onClick={() => onPageChange('customer-list')}
            >
              <Users className="h-6 w-6" />
              <span>Manage Customers</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2"
              onClick={() => onPageChange('create-admin')}
            >
              <UserPlus className="h-6 w-6" />
              <span>Create Admin</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}