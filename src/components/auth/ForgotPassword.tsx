import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { ArrowLeft, Mail, Shield } from 'lucide-react';

interface ForgotPasswordProps {
  onNavigate: (page: 'signin' | 'signup' | 'forgot-password' | 'profile' | 'dashboard') => void;
}

export function ForgotPassword({ onNavigate }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [step, setStep] = useState<'email' | 'token'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setStep('token');
      setMessage('A verification token has been sent to your email address.');
      setIsLoading(false);
    }, 1000);
  };

  const handleTokenSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock token verification
    setTimeout(() => {
      setMessage('Password reset successful! You can now sign in with your new password.');
      setIsLoading(false);
      // In real app, would redirect to signin or password reset form
      setTimeout(() => onNavigate('signin'), 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('signin')}
              className="p-0 h-auto"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-2xl">Reset Password</CardTitle>
          </div>
          <CardDescription>
            {step === 'email' 
              ? 'Enter your email address to receive a verification token'
              : 'Enter the verification token sent to your email'
            }
          </CardDescription>
        </CardHeader>

        {step === 'email' ? (
          <form onSubmit={handleEmailSubmit}>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 p-4 bg-accent/50 rounded-lg">
                <Mail className="h-5 w-5 text-primary" />
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
                {isLoading ? 'Sending...' : 'Send Verification Token'}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <form onSubmit={handleTokenSubmit}>
            <CardContent className="space-y-4">
              {message && (
                <Alert>
                  <Mail className="h-4 w-4" />
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}

              <div className="flex items-center space-x-2 p-4 bg-accent/50 rounded-lg">
                <Shield className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  Check your email for the verification token.
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="token">Verification Token</Label>
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
                {isLoading ? 'Verifying...' : 'Verify Token'}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setStep('email')}
                className="w-full"
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