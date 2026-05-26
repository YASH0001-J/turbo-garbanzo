'use client';

import { useAuth } from './auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function withProtectedRoute(Component: React.ComponentType<any>) {
  return function ProtectedRoute(props: any) {
    const router = useRouter();
    const { user, isLoading } = useAuth();
    const redirected = useRef(false);

    useEffect(() => {
      if (isLoading) return;

      if (!user && !redirected.current) {
        redirected.current = true;
        router.replace('/login');
      }
    }, [isLoading, user, router]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-gray-600">Loading...</div>
        </div>
      );
    }

    if (!user) {
      return null;
    }
// make it main and the seem to be same as the life of the nae
 //start//


 //end//
    return <Component {...props} />;
  };
}

// JS copil with the code not just be seen in the js fileand 
// API1  = SET FOR THE BACKEND 
// API2 = Set for the frontend js is 

