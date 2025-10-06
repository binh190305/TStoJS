import React, { useState } from 'react';
import { ArrowLeft, Mail, Shield, Loader2 } from 'lucide-react';

// --- Stubbed UI Components ---

// Card Components
const Card = ({ children, className = "" }) => <div className={`bg-white rounded-xl shadow-2xl border border-gray-100 ${className}`}>{children}</div>;
const CardHeader = ({ children, className = "" }) => <div className={`p-6 ${className}`}>{children}</div>;
const CardTitle = ({ children, className = "" }) => <h3 className={`text-2xl font-bold text-gray-800 ${className}`}>{children}</h3>;
const CardDescription = ({ children, className = "" }) => <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
const CardContent = ({ children, className = "" }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;
const CardFooter = ({ children, className = "" }) => <div className={`p-6 pt-0 border-t mt-4 ${className}`}>{children}</div>;


// Button Component
const Button = ({ children, onClick, type = 'button', variant = 'default', size = 'md', className = '', disabled = false }) => {
  let baseStyle = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  let sizeStyle = size === 'sm' ? 'px-3 py-1.5 text-sm' : size === 'icon' ? 'w-10 h-10 p-0' : 'px-4 py-2.5';
  let variantStyle = '';

  // Tailwind classes for variants
  switch (variant) {
    case 'outline':
      variantStyle = 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm';
      break;
    case 'ghost':
      variantStyle = 'hover:bg-gray-100 text-gray-600';
      break;
    default:
      // Primary button
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

// Input Component
const Input = ({ id, type = 'text', value, onChange, placeholder, className = '', required = false }) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-gray-900 ${className}`}
  />
);

// Label Component
const Label = ({ htmlFor, children, className = "" }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium text-gray-700 ${className}`}>
    {children}
  </label>
);

// Alert Components
const Alert = ({ children, variant = 'default', className = "" }) => {
    // We'll use 'default' for informational/success messages and 'destructive' for errors
    const style = variant === 'destructive' 
        ? 'bg-red-50 border border-red-200 text-red-800'
        : 'bg-green-50 border border-green-200 text-green-800'; // Default for success/info
    return (
        <div className={`p-4 rounded-lg flex items-center space-x-3 ${style} ${className}`} role="alert">
            {children}
        </div>
    );
};
const AlertDescription = ({ children }) => <p className="text-sm">{children}</p>;


// --- Main Component ---

export default function ForgotPassword({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [step, setStep] = useState('email');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    // Mock API call to send token
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    setStep('token');
    setMessage('A verification token has been sent to your email address. (Mock Token: 123456)');
    setIsLoading(false);
  };

  const handleTokenSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    // Mock token verification (simulating success if token is not empty)
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    if (token && token.trim() !== '') {
        setMessage('Password reset successful! You can now sign in with your new password.');
        // In real app, would redirect to signin after a short delay
        setTimeout(() => onNavigate('signin'), 2000);
    } else {
        setMessage('Invalid token. Please try again.');
        setStep('email'); // Send back to email step on failure
    }
    setIsLoading(false);
  };

  // Helper render function for loading state
  const LoadingContent = ({ text }) => (
    <>
      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      {text}
    </>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8 font-sans">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('signin')}
              className="p-1 h-8 w-8 text-gray-500 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-2xl">Reset Password</CardTitle>
          </div>
          <CardDescription className="ml-10">
            {step === 'email' 
              ? 'Enter your email address to receive a verification token'
              : 'Enter the verification token sent to your email'
            }
          </CardDescription>
        </CardHeader>

        {step === 'email' ? (
          <form onSubmit={handleEmailSubmit}>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 p-3 bg-blue-50 text-blue-800 rounded-lg border border-blue-200">
                <Mail className="h-5 w-5 text-blue-600" />
                <div className="text-sm">
                  We'll send a verification token to your email address.
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? <LoadingContent text="Sending..." /> : 'Send Verification Token'}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <form onSubmit={handleTokenSubmit}>
            <CardContent className="space-y-4">
              {/* Alert for success message from previous step */}
              {message && (
                <Alert className="items-start" variant={message.includes('successful') ? 'default' : 'destructive'}>
                  <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}

              <div className="flex items-center space-x-2 p-3 bg-blue-50 text-blue-800 rounded-lg border border-blue-200">
                <Shield className="h-5 w-5 text-blue-600" />
                <div className="text-sm">
                  Check your email for the verification token.
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="token">Verification Token (Try: 123456)</Label>
                <Input
                  id="token"
                  type="text"
                  placeholder="Enter the verification token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-2">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? <LoadingContent text="Verifying..." /> : 'Verify Token'}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                    setStep('email');
                    setMessage('');
                    setToken('');
                }}
                className="w-full text-gray-700 border-gray-300 hover:bg-gray-100"
                disabled={isLoading}
              >
                Resend Token
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}
