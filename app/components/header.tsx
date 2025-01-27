"use client"

import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    setUserType(storedUserType);
  }, [pathname]);

  const showNavigation = userType && pathname !== '/login' && pathname !== '/signup';

  return (
    <header className="bg-primary text-primary-foreground py-4 px-8">
      <div className="container mx-auto flex justify-between items-center">
        {showNavigation ? (
          <Link href="/dashboard" className="text-2xl font-bold">
            School Management
          </Link>
        ) : (
          <span className="text-2xl font-bold">School Management</span>
        )}
        <ModeToggle />
      </div>
    </header>
  );
}