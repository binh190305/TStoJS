"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
// Note: Dependencies like Input, Table, Dialog, etc., are not needed for this specific component logic,
// but they are typically assumed to be available from a component library like shadcn/ui.
import { Calendar, Clock, Users, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

// This component manages the weekly work schedule and shift assignments.
export function ShiftManagement({ onPageChange }) {
  // State to track the current week offset (0 = current week)
  const [currentWeek, setCurrentWeek] = useState(0);

  // Mock shift data
  const shifts = [
    { id: '1', employee: 'Alice Johnson', shift: 'morning', time: '6:00 AM - 2:00 PM', date: '2024-01-22', status: 'assigned' },
    { id: '2', employee: 'Bob Smith', shift: 'afternoon', time: '2:00 PM - 10:00 PM', date: '2024-01-22', status: 'assigned' },
    { id: '3', employee: 'Carol Brown', shift: 'evening', time: '6:00 PM - 2:00 AM', date: '2024-01-22', status: 'assigned' },
    { id: '4', employee: 'Alice Johnson', shift: 'morning', time: '6:00 AM - 2:00 PM', date: '2024-01-23', status: 'assigned' },
    { id: '5', employee: 'Bob Smith', shift: 'afternoon', time: '2:00 PM - 10:00 PM', date: '2024-01-23', status: 'pending' },
  ];

  // Helper function to determine the color scheme for a shift type
  const getShiftColor = (shift) => {
    switch (shift) {
      case 'morning': return 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200 transition-colors cursor-pointer';
      case 'afternoon': return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 transition-colors cursor-pointer';
      case 'evening': return 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200 transition-colors cursor-pointer';
      case 'night': return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 transition-colors cursor-pointer';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 transition-colors cursor-pointer';
    }
  };

  // Helper function to determine the badge variant for a shift status
  const getStatusColor = (status) => {
    switch (status) {
      case 'assigned': return 'default';
      case 'pending': return 'secondary';
      case 'completed': return 'outline';
      default: return 'secondary';
    }
  };

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const currentDate = new Date();
  
  // Calculate the start of the current week based on the offset
  const startOfWeek = new Date(currentDate);
  // Adjust to Monday (day 1) and apply the week offset
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1) + (currentWeek * 7));

  // Helper function to get the date string for a specific day index in the week
  const getDateForDay = (dayIndex) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + dayIndex);
    return date.toISOString().split('T')[0];
  };

  // Helper function to filter shifts for a specific date
  const getShiftsForDate = (date) => {
    return shifts.filter(shift => shift.date === date);
  };
  
  // Calculate the end date of the week for display
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Work Shifts</h1>
          <p className="text-muted-foreground">Manage employee work schedules</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Shift
        </Button>
      </div>

      {/* Week Navigation and Schedule */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle>Weekly Schedule</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentWeek(currentWeek - 1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentWeek(0)} disabled={currentWeek === 0}>
                Current Week
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentWeek(currentWeek + 1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardDescription>
            Week of {startOfWeek.toLocaleDateString()} - {endOfWeek.toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-3 overflow-x-auto min-w-full lg:min-w-0">
            {weekDays.map((day, index) => {
              const date = getDateForDay(index);
              const dayShifts = getShiftsForDate(date);
              
              const isToday = new Date().toDateString() === new Date(date).toDateString() && currentWeek === 0;

              return (
                <div key={day} className="flex-shrink-0 w-full md:w-auto space-y-2">
                  <div className={`text-center p-2 rounded-lg ${isToday ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <p className="font-medium text-sm">{day}</p>
                    <p className="text-xs">
                      {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  
                  {/* Shifts List */}
                  <div className="space-y-2 min-h-[200px]">
                    {dayShifts.length > 0 ? (
                      dayShifts.map((shift) => (
                        <div
                          key={shift.id}
                          className={`p-2 rounded-lg border text-xs shadow-sm transition-shadow hover:shadow-md ${getShiftColor(shift.shift)}`}
                        >
                          <p className="font-medium truncate">{shift.employee}</p>
                          <p className="text-xs font-mono">{shift.time}</p>
                          <Badge 
                            variant={getStatusColor(shift.status)} 
                            className="text-[10px] h-4 mt-1 font-semibold capitalize"
                          >
                            {shift.status}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-muted-foreground border-2 border-dashed rounded-lg h-full flex items-center justify-center">
                        No shifts
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Shift Types Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Shift Types Legend</CardTitle>
          <CardDescription>Available shift schedules and their visual codes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
            <div className="flex items-center space-x-3 p-3 border rounded-lg hover:shadow-sm transition-shadow">
              <div className="w-4 h-4 rounded bg-yellow-200 border border-yellow-300"></div>
              <div>
                <p className="font-medium text-sm">Morning</p>
                <p className="text-xs text-muted-foreground">6:00 AM - 2:00 PM</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 border rounded-lg hover:shadow-sm transition-shadow">
              <div className="w-4 h-4 rounded bg-blue-200 border border-blue-300"></div>
              <div>
                <p className="font-medium text-sm">Afternoon</p>
                <p className="text-xs text-muted-foreground">2:00 PM - 10:00 PM</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 border rounded-lg hover:shadow-sm transition-shadow">
              <div className="w-4 h-4 rounded bg-purple-200 border border-purple-300"></div>
              <div>
                <p className="font-medium text-sm">Evening</p>
                <p className="text-xs text-muted-foreground">6:00 PM - 2:00 AM</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 border rounded-lg hover:shadow-sm transition-shadow">
              <div className="w-4 h-4 rounded bg-gray-200 border border-gray-300"></div>
              <div>
                <p className="font-medium text-sm">Night</p>
                <p className="text-xs text-muted-foreground">10:00 PM - 6:00 AM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shifts</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shifts.length}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {shifts.filter(s => s.status === 'assigned').length}
            </div>
            <p className="text-xs text-muted-foreground">Confirmed shifts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {shifts.filter(s => s.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
