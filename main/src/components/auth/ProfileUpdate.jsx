import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, User, Loader2 } from 'lucide-react';

// --- Stubbed UI Components and Hooks ---

// 1. Mock User Data and Auth Hook
let mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    role: 'admin',
    avatar: 'https://placehold.co/400x400/3B82F6/ffffff?text=JD', // Placeholder image
};

const useAuth = () => {
    const [user, setUser] = useState(mockUser);
    
    // Function to simulate profile update logic
    const updateProfile = (newFormData) => {
        // Update the mock global state and the component's state
        mockUser = { ...mockUser, ...newFormData };
        setUser(mockUser);
        console.log("Mock profile updated:", mockUser);
    };

    // Simulate persistent user loading
    useEffect(() => {
        setUser(mockUser);
    }, []);

    return { 
        user, 
        updateProfile 
    };
};

// 2. Card Components
const Card = ({ children, className = "" }) => <div className={`bg-white rounded-xl shadow-2xl border border-gray-100 ${className}`}>{children}</div>;
const CardHeader = ({ children, className = "" }) => <div className={`p-6 ${className}`}>{children}</div>;
const CardTitle = ({ children, className = "" }) => <h3 className={`text-2xl font-bold text-gray-800 ${className}`}>{children}</h3>;
const CardDescription = ({ children, className = "" }) => <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
const CardContent = ({ children, className = "" }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;

// 3. Button Component
const Button = ({ children, onClick, type = 'button', variant = 'default', size = 'md', className = '', disabled = false }) => {
  let baseStyle = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  let sizeStyle = size === 'sm' ? 'px-3 py-1.5 text-sm' : size === 'icon' ? 'w-10 h-10 p-0' : 'px-4 py-2.5';
  let variantStyle = '';

  switch (variant) {
    case 'outline':
      variantStyle = 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm';
      break;
    case 'ghost':
      variantStyle = 'hover:bg-gray-100 text-gray-600';
      break;
    case 'link':
      variantStyle = 'text-blue-600 underline-offset-4 hover:underline hover:text-blue-700 p-0 h-auto';
      break;
    default:
      variantStyle = 'bg-blue-600 text-white hover:bg-blue-700 shadow-md';
      break;
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

// 4. Input Component
const Input = ({ id, name, type = 'text', value, onChange, placeholder, className = '', required = false, disabled = false }) => (
  <input
    id={id}
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    disabled={disabled}
    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-gray-900 ${className} ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
  />
);

// 5. Label Component
const Label = ({ htmlFor, children, className = "" }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium text-gray-700 ${className}`}>
    {children}
  </label>
);

// 6. Alert Components
const Alert = ({ children, variant = 'default', className = "" }) => {
    const style = variant === 'destructive' 
        ? 'bg-red-50 border border-red-200 text-red-800'
        : 'bg-green-50 border border-green-200 text-green-800'; // 'default' for success
    return (
        <div className={`p-3 rounded-lg ${style} ${className}`} role="alert">
            {children}
        </div>
    );
};
const AlertDescription = ({ children }) => <p className="text-sm">{children}</p>;

// 7. Avatar Components
const Avatar = ({ children, className = "" }) => <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>{children}</div>;
const AvatarImage = ({ src, alt }) => <img src={src} alt={alt} className="aspect-square h-full w-full" onError={(e) => e.currentTarget.style.display = 'none'} />;
const AvatarFallback = ({ children, className = "" }) => <div className={`flex h-full w-full items-center justify-center rounded-full bg-gray-200 ${className}`}>{children}</div>;


// --- Main Component ---

export default function ProfileUpdate({ onNavigate }) {
  const { user, updateProfile } = useAuth();
  
  // Dùng useEffect để đồng bộ state với user từ hook (đảm bảo cập nhật sau khi mockUser thay đổi)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  useEffect(() => {
    if (user) {
        setFormData({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || ''
        });
    }
  }, [user]);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      updateProfile(formData);
      setMessage('Profile updated successfully!');
    } catch (err) {
      console.error('Update failed:', err);
      setMessage('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return '??';
    const words = name.split(' ').filter(word => word.length > 0);
    if (words.length > 1) {
        return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8 font-sans">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('dashboard')}
              className="p-1 h-8 w-8 text-gray-500 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-2xl">Update Profile</CardTitle>
          </div>
          <CardDescription className="ml-10">
            Update your personal information
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {message && (
              <Alert variant={message.includes('successfully') ? 'default' : 'destructive'}>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                  <AvatarImage 
                    src={user?.avatar} 
                    alt={user?.name || 'User Avatar'} 
                    // Fallback using placehold.co on error
                    onError={(e) => {
                        e.currentTarget.onerror = null; // prevents infinite loop
                        e.currentTarget.src = `https://placehold.co/400x400/3B82F6/ffffff?text=${getInitials(user?.name || 'JD')}`;
                    }}
                  />
                  <AvatarFallback className="bg-blue-600 text-white text-3xl font-semibold">
                    {user?.name ? getInitials(user.name) : <User className="h-10 w-10" />}
                  </AvatarFallback>
                </Avatar>
                <input type="file" id="avatar-upload" className="hidden" accept="image/*" />
                <Label htmlFor="avatar-upload" className="absolute bottom-0 right-0 p-1.5 bg-gray-800 text-white rounded-full cursor-pointer hover:bg-gray-700 transition duration-150 shadow-md">
                    <Upload className="h-4 w-4" />
                </Label>
              </div>

            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                // Thường email không thể chỉnh sửa được sau khi đăng ký
                disabled
              />
              <p className="text-xs text-gray-500">Email cannot be changed.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-sm space-y-1">
                <p className="font-medium text-gray-700">Account Type:</p>
                <p className="text-gray-600 capitalize font-semibold">{user?.role}</p>
              </div>
            </div>
          </CardContent>
          
          <div className="px-6 pb-6 space-y-3">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Profile'
              )}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              className="w-full text-gray-700 border-gray-300 hover:bg-gray-100"
              onClick={() => onNavigate('dashboard')}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
