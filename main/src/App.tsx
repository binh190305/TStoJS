import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { AuthProvider, useAuth } from './components/AuthProvider';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { ForgotPassword } from './components/auth/ForgotPassword';
import { ProfileUpdate } from './components/auth/ProfileUpdate';

type Page = 'signin' | 'signup' | 'forgot-password' | 'profile' | 'dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('signin');
  const { user } = useAuth();

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
  };

  if (user && currentPage !== 'profile') {
    return <Dashboard onNavigate={handlePageChange} />;
  }

  switch (currentPage) {
    case 'signin':
      return <SignIn onNavigate={handlePageChange} />;
    case 'signup':
      return <SignUp onNavigate={handlePageChange} />;
    case 'forgot-password':
      return <ForgotPassword onNavigate={handlePageChange} />;
    case 'profile':
      return <ProfileUpdate onNavigate={handlePageChange} />;
    default:
      return <SignIn onNavigate={handlePageChange} />;
  }
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}