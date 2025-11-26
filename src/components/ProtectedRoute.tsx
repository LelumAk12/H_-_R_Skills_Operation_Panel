import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
}

/**
 * ProtectedRoute wraps pages that require authentication.
 * If not authenticated, redirects to login page.
 */
export function ProtectedRoute({ children, isAuthenticated = true }: ProtectedRouteProps) {
  // In a real app, check localStorage or context for auth token
  const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  const isAuth = isAuthenticated && !!authToken;

  if (!isAuth) {
    return <Navigate to="/operations/login" replace />;
  }

  return <>{children}</>;
}
