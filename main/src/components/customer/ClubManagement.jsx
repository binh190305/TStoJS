import React, { useState } from 'react';
// Import các biểu tượng cần thiết
import { Building, Plus, Edit, Trash2, MapPin, Phone, Hash } from 'lucide-react';

// --- UI Component Stubs (Tailwind CSS based) ---
// Thẻ Card
const Card = ({ children, className = "" }) => <div className={`bg-white rounded-xl shadow-lg border border-gray-100 ${className}`}>{children}</div>;
const CardHeader = ({ children, className = "" }) => <div className={`p-4 border-b ${className}`}>{children}</div>;
const CardTitle = ({ children, className = "" }) => <h3 className={`text-lg font-semibold text-gray-800 ${className}`}>{children}</h3>;
const CardDescription = ({ children, className = "" }) => <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
const CardContent = ({ children, className = "" }) => <div className={`p-4 ${className}`}>{children}</div>;

// Nút Button
const Button = ({ children, onClick, variant = 'default', size = 'md', className = '', disabled = false }) => {
  let baseStyle = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  let sizeStyle = size === 'sm' ? 'px-3 py-1.5 text-sm' : size === 'icon' ? 'w-9 h-9 p-0' : 'px-4 py-2';
  let variantStyle = '';

  switch (variant) {
    case 'destructive':
      variantStyle = 'bg-red-600 text-white hover:bg-red-700';
      break;
    case 'outline':
      variantStyle = 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50';
      break;
    case 'ghost':
      variantStyle = 'hover:bg-gray-100 text-gray-600';
      break;
    default:
      variantStyle = 'bg-blue-600 text-white hover:bg-blue-700 shadow-md';
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${sizeStyle} ${variantStyle} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Ô nhập liệu Input
const Input = ({ id, type = 'text', value, onChange, placeholder, className = '' }) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${className}`}
  />
);

// Nhãn Label
const Label = ({ htmlFor, children, className = "" }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium text-gray-700 ${className}`}>
    {children}
  </label>
);

// Bảng Table Components
const Table = ({ children, className = "" }) => <div className="overflow-x-auto"><table className={`min-w-full divide-y divide-gray-200 ${className}`}>{children}</table></div>;
const TableHeader = ({ children }) => <thead className="bg-gray-50">{children}</thead>;
const TableBody = ({ children }) => <tbody className="divide-y divide-gray-200">{children}</tbody>;
const TableRow = ({ children, className = "" }) => <tr className={`hover:bg-gray-50 transition-colors ${className}`}>{children}</tr>;
const TableHead = ({ children, className = "" }) => <th className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>{children}</th>;
const TableCell = ({ children, className = "" }) => <td className={`px-4 py-4 whitespace-nowrap text-sm text-gray-900 ${className}`}>{children}</td>;

// Huy hiệu Badge
const Badge = ({ children, variant = 'default', className = "" }) => {
  let style = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors';
  
  switch (variant) {
    case 'secondary':
      style += ' bg-gray-100 text-gray-600 border border-gray-200';
      break;
    case 'outline':
      style += ' bg-blue-50 text-blue-600 border border-blue-200';
      break;
    case 'destructive':
      style += ' bg-red-100 text-red-800 border border-red-200';
      break;
    default: // active
      style += ' bg-green-100 text-green-800 border border-green-200';
      break;
  }

  return <span className={`${style} ${className}`}>{children}</span>;
};

// Hộp thoại Dialog
const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex justify-center items-center p-4" onClick={() => onOpenChange(false)}>
      <div className="relative w-full max-w-lg mx-auto" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
const DialogContent = ({ children, className = "" }) => <div className={`bg-white rounded-xl shadow-2xl p-6 ${className}`}>{children}</div>;
const DialogHeader = ({ children }) => <div className="space-y-1 mb-4">{children}</div>;
const DialogTitle = ({ children }) => <h4 className="text-xl font-bold text-gray-800">{children}</h4>;
const DialogDescription = ({ children }) => <p className="text-sm text-gray-500">{children}</p>;
const DialogFooter = ({ children }) => <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">{children}</div>;

// Component chính
export default function ClubManagement({ onPageChange }) {
  const [clubs, setClubs] = useState([
    { id: '1', name: 'Downtown Billiards Club', address: '456 Downtown Ave, City', phone: '+1 234 567 8900', status: 'active', tables: 8 },
    { id: '2', name: 'Uptown Pool Hall', address: '789 Uptown Blvd, City', phone: '+1 234 567 8910', status: 'active', tables: 12 },
    { id: '3', name: 'Westside Snooker Lounge', address: '101 West St, City', phone: '+1 234 567 8920', status: 'inactive', tables: 6 },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClub, setEditingClub] = useState(null); // Loại bỏ <any>
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    status: 'active',
    tables: 0, // Thêm tables vào formData để có thể thêm/chỉnh sửa
  });

  const handleEdit = (club) => { // Loại bỏ : any
    setEditingClub(club);
    setFormData(club);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingClub(null);
    setFormData({ name: '', address: '', phone: '', status: 'active', tables: 0 });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    // Ép kiểu cho số bàn
    const finalFormData = {
      ...formData,
      tables: parseInt(formData.tables, 10) || 0,
    };

    if (editingClub) {
      // Khi chỉnh sửa, giữ nguyên id và đảm bảo tables được lưu đúng
      setClubs(clubs.map(club => 
        club.id === editingClub.id ? { ...finalFormData, id: editingClub.id } : club
      ));
    } else {
      // Khi thêm mới, tạo id và đảm bảo tables được thêm vào
      setClubs([...clubs, { ...finalFormData, id: Date.now().toString() }]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id) => { // Loại bỏ : string
    setClubs(clubs.filter(club => club.id !== id));
  };

  // Tính toán Tóm tắt
  const totalClubs = clubs.length;
  const activeClubs = clubs.filter(c => c.status === 'active').length;
  const totalTables = clubs.reduce((sum, club) => sum + (club.tables || 0), 0);


  return (
    <div className="space-y-6 p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Quản Lý Câu Lạc Bộ Billiards</h1>
          <p className="text-gray-500">Quản lý tất cả các địa điểm câu lạc bộ của bạn.</p>
        </div>
        <Button onClick={handleAdd} className="mt-4 md:mt-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Plus className="h-4 w-4 mr-2" />
          Thêm Câu Lạc Bộ (Add Club)
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tổng Câu Lạc Bộ</CardTitle>
            <Building className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold">{totalClubs}</div>
            <p className="text-xs text-gray-400 mt-1">Tổng số địa điểm</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Câu Lạc Bộ Hoạt Động</CardTitle>
            <Building className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-green-600">
              {activeClubs}
            </div>
            <p className="text-xs text-gray-400 mt-1">Đang mở cửa và hoạt động</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tổng Số Bàn</CardTitle>
            <Hash className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-orange-600">
              {totalTables}
            </div>
            <p className="text-xs text-gray-400 mt-1">Tổng khả năng phục vụ</p>
          </CardContent>
        </Card>
      </div>

      {/* Club Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh Sách Câu Lạc Bộ</CardTitle>
          <CardDescription>Xem và chỉnh sửa chi tiết các địa điểm.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên Câu Lạc Bộ</TableHead>
                <TableHead>Địa Chỉ</TableHead>
                <TableHead>Điện Thoại</TableHead>
                <TableHead>Số Bàn</TableHead>
                <TableHead>Trạng Thái</TableHead>
                <TableHead>Thao Tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clubs.map((club) => (
                <TableRow key={club.id}>
                  <TableCell className="font-semibold text-gray-800">
                    <div className="flex items-center space-x-3">
                      <Building className="h-4 w-4 text-blue-600" />
                      <span>{club.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm truncate max-w-xs">{club.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{club.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{club.tables} bàn</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={club.status === 'active' ? 'default' : 'secondary'}>
                      {club.status === 'active' ? 'Hoạt Động' : 'Ngừng Hoạt Động'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEdit(club)}
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50/50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(club.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50/50"
                      >
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

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingClub ? 'Chỉnh Sửa Câu Lạc Bộ' : 'Thêm Câu Lạc Bộ Mới'}</DialogTitle>
            <DialogDescription>
              {editingClub ? 'Cập nhật thông tin chi tiết của câu lạc bộ.' : 'Thêm một địa điểm mới vào danh sách quản lý.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên Câu Lạc Bộ (Club Name)</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ví dụ: Downtown Billiards Club"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Địa Chỉ (Address)</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Ví dụ: 456 Downtown Ave, City"
              />
            </div>
            <div className="grid gap-4 grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Điện Thoại (Phone)</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tables">Số Bàn (Number of Tables)</Label>
                <Input
                  id="tables"
                  type="number"
                  min="0"
                  value={formData.tables}
                  onChange={(e) => setFormData({ ...formData, tables: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>
            {/* Status (Optional: add selection for status if needed, currently defaults to active) */}
            <div className="space-y-2">
                <Label htmlFor="status">Trạng Thái (Status)</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white h-10 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                >
                    <option value="active">Hoạt Động</option>
                    <option value="inactive">Ngừng Hoạt Động</option>
                </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Hủy (Cancel)
            </Button>
            <Button onClick={handleSave}>
              {editingClub ? 'Cập Nhật Câu Lạc Bộ' : 'Tạo Câu Lạc Bộ'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
