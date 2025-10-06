import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { PageType } from '../Dashboard';
import { Building, Plus, Edit, Trash2, MapPin } from 'lucide-react';

interface ClubManagementProps {
  onPageChange: (page: PageType) => void;
}

export function ClubManagement({ onPageChange }: ClubManagementProps) {
  const [clubs, setClubs] = useState([
    { id: '1', name: 'Downtown Billiards Club', address: '456 Downtown Ave, City', phone: '+1234567890', status: 'active', tables: 8 },
    { id: '2', name: 'Uptown Pool Hall', address: '789 Uptown Blvd, City', phone: '+1234567891', status: 'active', tables: 12 },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClub, setEditingClub] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    status: 'active'
  });

  const handleEdit = (club: any) => {
    setEditingClub(club);
    setFormData(club);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingClub(null);
    setFormData({ name: '', address: '', phone: '', status: 'active' });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingClub) {
      setClubs(clubs.map(club => club.id === editingClub.id ? { ...formData, id: editingClub.id, tables: club.tables } : club));
    } else {
      setClubs([...clubs, { ...formData, id: Date.now().toString(), tables: 0 }]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setClubs(clubs.filter(club => club.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Club Management</h1>
          <p className="text-muted-foreground">Manage your billiards clubs</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Club
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Clubs</CardTitle>
          <CardDescription>Manage all your billiards club locations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Club Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Tables</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clubs.map((club) => (
                <TableRow key={club.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-primary" />
                      <span className="font-medium">{club.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{club.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>{club.phone}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{club.tables} tables</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={club.status === 'active' ? 'default' : 'secondary'}>
                      {club.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(club)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(club.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingClub ? 'Edit Club' : 'Add New Club'}</DialogTitle>
            <DialogDescription>
              {editingClub ? 'Update club information' : 'Create a new billiards club'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Club Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter club name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter club address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingClub ? 'Update' : 'Create'} Club
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}