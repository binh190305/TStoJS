"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
// Note: PageType is not used in this file's logic, so its specific import is omitted.
import { Percent, Plus, Edit, Trash2, Calendar, DollarSign } from 'lucide-react';

// Initial structure for a new promotion form state
const initialFormData = {
  code: '',
  name: '',
  discountType: 'percentage',
  discountValue: 10,
  startDate: '',
  endDate: '',
  status: 'active'
};

export function PromotionManagement({ onPageChange }) {
  const [promotions, setPromotions] = useState([
    { id: '1', code: 'HAPPY20', name: 'Happy Hour 20%', discountType: 'percentage', discountValue: 20, startDate: '2024-01-01', endDate: '2024-03-31', status: 'active', usageCount: 45 },
    { id: '2', code: 'STUDENT15', name: 'Student Discount', discountType: 'percentage', discountValue: 15, startDate: '2024-01-01', endDate: '2024-12-31', status: 'active', usageCount: 23 },
    { id: '3', code: 'WEEKEND10', name: 'Weekend Special', discountType: 'fixed', discountValue: 10, startDate: '2024-01-01', endDate: '2024-06-30', status: 'inactive', usageCount: 12 },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState(null); 
  const [formData, setFormData] = useState(initialFormData);

  // Helper functions for updating form data
  const handleValueChange = (e) => {
    const { id, value, type } = e.target;
    // Special handling for number input to ensure it's stored as a number, otherwise as string
    const updatedValue = type === 'number' ? parseFloat(value) : value;
    setFormData({ ...formData, [id]: updatedValue });
  };
  
  const handleSelectChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };


  const handleEdit = (promotion) => {
    setEditingPromotion(promotion);
    setFormData(promotion);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingPromotion(null);
    setFormData(initialFormData);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    // Ensure discountValue is stored as a number
    const finalFormData = {
      ...formData,
      discountValue: Number(formData.discountValue),
    };

    if (editingPromotion) {
      setPromotions(promotions.map(promo => 
        promo.id === editingPromotion.id 
          ? { ...finalFormData, id: editingPromotion.id, usageCount: promo.usageCount } 
          : promo
      ));
    } else {
      setPromotions([...promotions, { ...finalFormData, id: Date.now().toString(), usageCount: 0 }]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id) => {
    setPromotions(promotions.filter(promo => promo.id !== id));
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'default' : 'secondary';
  };

  const formatDiscount = (type, value) => {
    return type === 'percentage' ? `${value}%` : `$${value}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Promotion Management</h1>
          <p className="text-muted-foreground">Manage discount codes and promotions</p>
        </div>
        <Button onClick={handleAdd} className="hover:shadow-md transition-shadow">
          <Plus className="h-4 w-4 mr-2" />
          Add Promotion
        </Button>
      </div>

      {/* Promotion Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Promotions</CardTitle>
          <CardDescription>View, edit, or delete discount codes and offers.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Promotion</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Valid Period</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promotions.map((promotion) => (
                  <TableRow key={promotion.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{promotion.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="bg-muted px-2 py-1 rounded text-sm font-mono border border-input/50">{promotion.code}</code>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {promotion.discountType === 'percentage' ? (
                          <Percent className="h-4 w-4 text-primary" />
                        ) : (
                          <DollarSign className="h-4 w-4 text-primary" />
                        )}
                        <span className="font-semibold text-primary">
                          {formatDiscount(promotion.discountType, promotion.discountValue)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span className="text-xs">{promotion.startDate}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          to <span className="font-medium">{promotion.endDate}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs font-semibold bg-gray-50/50">{promotion.usageCount} uses</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={getStatusColor(promotion.status)} 
                        className={`capitalize font-semibold ${promotion.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}
                      >
                        {promotion.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(promotion)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50/50 transition-colors rounded-full">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(promotion.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50/50 transition-colors rounded-full">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingPromotion ? 'Edit Promotion' : 'Create New Promotion'}</DialogTitle>
            <DialogDescription>
              {editingPromotion ? 'Update promotion details and availability.' : 'Create a new discount promotion by filling out the details below.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-4 grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Promotion Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleValueChange}
                  placeholder="e.g., Summer Special"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Promo Code</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="E.g., SAVEBIG"
                />
              </div>
            </div>
            
            <div className="grid gap-4 grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="discountType">Discount Type</Label>
                <Select value={formData.discountType} onValueChange={(value) => handleSelectChange('discountType', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="discountValue">
                  Discount Value {formData.discountType === 'percentage' ? '(%)' : '($)'}
                </Label>
                <Input
                  id="discountValue"
                  type="number"
                  min={0}
                  step={formData.discountType === 'percentage' ? 1 : 0.01}
                  value={formData.discountValue}
                  onChange={handleValueChange}
                  placeholder="Value"
                />
              </div>
            </div>

            <div className="grid gap-4 grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleValueChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleValueChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              {editingPromotion ? 'Update Changes' : 'Create Promotion'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Promotions</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{promotions.length}</div>
            <p className="text-xs text-muted-foreground">Overall created promotions</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Promotions</CardTitle>
            <Badge variant="default" className="bg-green-500 h-4 w-4 p-0" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {promotions.filter(p => p.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {promotions.reduce((sum, p) => sum + p.usageCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Total times used across all promotions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
