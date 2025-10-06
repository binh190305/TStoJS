import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import { useAuth } from '../AuthProvider';
import { PageType } from '../Dashboard';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Building, 
  Table, 
  UserCheck, 
  Calendar, 
  UserCog, 
  Percent, 
  Package,
  Receipt,
  ClipboardList,
  Clock
} from 'lucide-react';

interface AppSidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

export function AppSidebar({ currentPage, onPageChange }: AppSidebarProps) {
  const { user } = useAuth();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          {
            title: 'Overview',
            items: [
              { title: 'Dashboard', page: 'admin-dashboard' as PageType, icon: LayoutDashboard },
            ]
          },
          {
            title: 'Management',
            items: [
              { title: 'Customers', page: 'customer-list' as PageType, icon: Users },
              { title: 'Create Admin', page: 'create-admin' as PageType, icon: UserPlus },
            ]
          }
        ];

      case 'customer':
        return [
          {
            title: 'Overview',
            items: [
              { title: 'Dashboard', page: 'customer-dashboard' as PageType, icon: LayoutDashboard },
            ]
          },
          {
            title: 'Club Management',
            items: [
              { title: 'Clubs', page: 'clubs' as PageType, icon: Building },
              { title: 'Tables', page: 'tables' as PageType, icon: Table },
            ]
          },
          {
            title: 'Staff Management',
            items: [
              { title: 'Staff', page: 'staff' as PageType, icon: UserCheck },
              { title: 'Work Shifts', page: 'shifts' as PageType, icon: Calendar },
              { title: 'Staff Accounts', page: 'staff-accounts' as PageType, icon: UserCog },
            ]
          },
          {
            title: 'Business',
            items: [
              { title: 'Promotions', page: 'promotions' as PageType, icon: Percent },
              { title: 'Products', page: 'products' as PageType, icon: Package },
            ]
          }
        ];

      case 'staff':
        return [
          {
            title: 'Overview',
            items: [
              { title: 'Dashboard', page: 'staff-dashboard' as PageType, icon: LayoutDashboard },
            ]
          },
          {
            title: 'Operations',
            items: [
              { title: 'Bill Management', page: 'bills' as PageType, icon: Receipt },
              { title: 'Work Schedule', page: 'schedule' as PageType, icon: ClipboardList },
              { title: 'Attendance', page: 'attendance' as PageType, icon: Clock },
            ]
          }
        ];

      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.page}>
                    <SidebarMenuButton 
                      onClick={() => onPageChange(item.page)}
                      isActive={currentPage === item.page}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}