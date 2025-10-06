import React, { useState } from 'react';
import { Search, MoreHorizontal, Eye, UserX, UserCheck, ChevronDown } from 'lucide-react';

// --- Stubbed UI Components (Sử dụng Tailwind CSS) ---

// Card Components
const Card = ({ children, className = "" }) => <div className={`bg-white rounded-xl shadow-lg border border-gray-100 ${className}`}>{children}</div>;
const CardHeader = ({ children, className = "" }) => <div className={`p-5 pb-3 ${className}`}>{children}</div>;
const CardTitle = ({ children, className = "" }) => <h3 className={`text-xl font-semibold text-gray-800 ${className}`}>{children}</h3>;
const CardDescription = ({ children, className = "" }) => <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
const CardContent = ({ children, className = "" }) => <div className={`p-5 pt-2 ${className}`}>{children}</div>;

// Button Component
const Button = ({ children, onClick, type = 'button', variant = 'default', size = 'md', className = '', disabled = false, asChild = false }) => {
  let baseStyle = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  let sizeStyle = size === 'sm' ? 'px-3 py-1.5 text-sm' : size === 'icon' ? 'w-8 h-8 p-0' : 'px-4 py-2.5';
  let variantStyle = '';

  switch (variant) {
    case 'outline':
      variantStyle = 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm';
      break;
    case 'ghost':
      variantStyle = 'hover:bg-gray-100 text-gray-600';
      break;
    default:
      variantStyle = 'bg-blue-600 text-white hover:bg-blue-700 shadow-md';
      break;
  }
  
  if (asChild) {
      return children; // For DropdownMenuTrigger
  }

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${baseStyle} ${sizeStyle} ${variantStyle} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Input Component
const Input = ({ type = 'text', value, onChange, placeholder, className = '' }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-gray-900 ${className}`}
  />
);

// Table Components
const Table = ({ children }) => <table className="w-full caption-bottom text-sm">{children}</table>;
const TableHeader = ({ children }) => <thead className="[&_tr]:border-b">{children}</thead>;
const TableBody = ({ children }) => <tbody className="[&_tr:last-child]:border-0">{children}</tbody>;
const TableRow = ({ children, key }) => <tr key={key} className="border-b transition-colors hover:bg-gray-50 data-[state=selected]:bg-gray-100">{children}</tr>;
const TableHead = ({ children }) => <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0">{children}</th>;
const TableCell = ({ children }) => <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{children}</td>;

// Badge Component
const Badge = ({ children, variant = 'default', className = '' }) => {
    let style = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    switch (variant) {
        case 'secondary':
            style += ' bg-gray-100 text-gray-800'; // Inactive
            break;
        case 'outline':
            style += ' border border-gray-300 text-gray-700';
            break;
        default:
            style += ' bg-green-500 text-white hover:bg-green-600'; // Active
            break;
    }

    return <span className={`${style} ${className}`}>{children}</span>;
};

// Switch Component (Mocked with simple visual)
const Switch = ({ checked, onCheckedChange }) => (
  <button
    role="switch"
    aria-checked={checked}
    onClick={onCheckedChange}
    className={`inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}
  >
    <span
      aria-hidden="true"
      className={`pointer-events-none h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-4' : 'translate-x-0'}`}
    />
  </button>
);

// Dropdown Menu Components (Mocked using simple absolute positioning)
const DropdownMenu = ({ children }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative inline-block text-left">
            {React.Children.map(children, child => {
                if (child.type === DropdownMenuTrigger) {
                    return React.cloneElement(child, { onClick: () => setOpen(!open) });
                }
                if (child.type === DropdownMenuContent && open) {
                    return React.cloneElement(child, { setOpen });
                }
                return null;
            })}
        </div>
    );
};
const DropdownMenuTrigger = ({ children, asChild, onClick }) => {
    // We expect this to contain a Button with asChild=true
    return React.cloneElement(children, { onClick });
};
const DropdownMenuContent = ({ children, align = 'end', setOpen }) => {
    let alignment = align === 'end' ? 'right-0' : 'left-0';
    return (
        <div 
            className={`absolute ${alignment} z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            role="menu" 
            aria-orientation="vertical" 
            tabIndex="-1"
            onMouseLeave={() => setOpen(false)}
        >
            <div className="py-1" role="none">
                {React.Children.map(children, child => 
                    React.cloneElement(child, { onClick: () => { child.props.onClick(); setOpen(false); }})
                )}
            </div>
        </div>
    );
};
const DropdownMenuItem = ({ children, onClick }) => (
    <button 
        onClick={onClick}
        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-150" 
        role="menuitem"
    >
        {children}
    </button>
);

// --- Main Component ---

export default function CustomerList({ onCustomerSelect, onPageChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [customers, setCustomers] = useState([
    { id: '1', name: 'John Smith', email: 'john@example.com', phone: '+1234567890', status: 'active', joinDate: '2024-01-15', clubs: 2 },
    { id: '2', name: 'Jane Doe', email: 'jane@example.com', phone: '+1234567891', status: 'active', joinDate: '2024-01-10', clubs: 1 },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', phone: '+1234567892', status: 'inactive', joinDate: '2024-01-05', clubs: 3 },
    { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+1234567893', status: 'active', joinDate: '2023-12-28', clubs: 1 },
    { id: '5', name: 'David Brown', email: 'david@example.com', phone: '+1234567894', status: 'active', joinDate: '2023-12-20', clubs: 2 },
    { id: '6', name: 'Lisa Garcia', email: 'lisa@example.com', phone: '+1234567895', status: 'inactive', joinDate: '2023-12-15', clubs: 1 },
  ]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  const handleStatusToggle = (customerId, currentStatus) => {
    // Giả lập chuyển đổi trạng thái - cập nhật state cục bộ
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    setCustomers(prev => prev.map(c => 
        c.id === customerId ? { ...c, status: newStatus } : c
    ));
    
    console.log(`Đã chuyển trạng thái khách hàng ${customerId} thành ${newStatus}`);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      
      {/* Tiêu đề và Điều khiển */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Khách hàng</h1>
          <p className="text-gray-500 mt-1">Quản lý tài khoản khách hàng và quyền truy cập.</p>
        </div>
        <Button 
            onClick={() => onPageChange('admin-dashboard')}
            variant="outline"
            className="shadow-sm"
        >
          Quay lại Bảng điều khiển
        </Button>
      </div>
      
      {/* Thẻ Chính */}
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle>Danh sách Khách hàng ({filteredCustomers.length} kết quả)</CardTitle>
          <CardDescription>
            Xem và quản lý tất cả tài khoản khách hàng. Sử dụng công tắc để bật/tắt trạng thái kích hoạt.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200 max-w-lg">
            <Search className="h-4 w-4 text-gray-400 shrink-0" />
            <Input
              placeholder="Tìm kiếm khách hàng bằng tên, email hoặc số điện thoại..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-none bg-transparent p-0 focus:ring-0"
            />
          </div>

          <div className="rounded-xl border overflow-x-auto shadow-inner">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[180px]">Khách hàng</TableHead>
                  <TableHead className="min-w-[150px]">Liên hệ</TableHead>
                  <TableHead>Ngày tham gia</TableHead>
                  <TableHead>Câu lạc bộ</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="space-y-0.5">
                        <p className="font-semibold text-gray-800">{customer.name}</p>
                        <p className="text-xs text-gray-500">{customer.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-600">{customer.phone}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-600">{customer.joinDate}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">{customer.clubs} câu lạc bộ</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Switch
                          checked={customer.status === 'active'}
                          onCheckedChange={() => handleStatusToggle(customer.id, customer.status)}
                        />
                        <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                          {customer.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-200">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onCustomerSelect(customer.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Xem Chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleStatusToggle(customer.id, customer.status)}
                            className={customer.status === 'active' ? 'text-red-600' : 'text-green-600'}
                          >
                            {customer.status === 'active' ? (
                              <>
                                <UserX className="mr-2 h-4 w-4" />
                                Hủy kích hoạt
                              </>
                            ) : (
                              <>
                                <UserCheck className="mr-2 h-4 w-4" />
                                Kích hoạt
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg mt-4 border border-dashed border-gray-300">
              <p className="text-gray-500 font-medium text-lg">Không tìm thấy khách hàng nào phù hợp với tìm kiếm của bạn.</p>
              <p className="text-sm text-gray-400 mt-1">Hãy thử mở rộng tiêu chí tìm kiếm.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tóm tắt Thống kê */}
      <div className="grid gap-4 mt-6 md:grid-cols-3">
        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Tổng số Khách hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-gray-900">{customers.length}</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Khách hàng Hoạt động</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-green-600">
              {customers.filter(c => c.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Khách hàng Không hoạt động</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-red-600">
              {customers.filter(c => c.status === 'inactive').length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
