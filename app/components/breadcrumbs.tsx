"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Breadcrumbs() {
  const pathname = usePathname();
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    setUserType(storedUserType);
  }, [pathname]);

  if (!userType || pathname === '/login' || pathname === '/signup') {
    return null;
  }

  const paths = pathname.split('/').filter(Boolean);

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/" passHref legacyBehavior>
            <a className="text-gray-700 hover:text-gray-900">Home</a>
          </Link>
        </li>
        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join('/')}`;
          const isLast = index === paths.length - 1;
          return (
            <li key={path}>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <Link href={href} passHref legacyBehavior>
                  <a
                    className={`ml-1 md:ml-2 text-sm font-medium ${
                      isLast ? 'text-gray-500' : 'text-gray-700 hover:text-gray-900'
                    }`}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {path.charAt(0).toUpperCase() + path.slice(1)}
                  </a>
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}