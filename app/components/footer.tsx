"use client"

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Footer() {
  const pathname = usePathname();
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    setUserType(storedUserType);
  }, [pathname]);

  if (!userType || pathname === '/login' || pathname === '/signup') {
    return null;
  }

  return (
    <footer className="bg-gray-100 py-4 px-8 text-center">
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} School Management System. All rights reserved.
      </p>
    </footer>
  );
}