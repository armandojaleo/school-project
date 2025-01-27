"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { School, Users, UserCheck, BookOpen, GraduationCap, LayoutDashboard, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const adminMenuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/schools', label: 'Schools', icon: School },
  { href: '/students', label: 'Students', icon: Users },
  { href: '/teachers', label: 'Teachers', icon: UserCheck },
  { href: '/courses', label: 'Courses', icon: BookOpen },
  { href: '/subjects', label: 'Subjects', icon: GraduationCap },
];

const teacherMenuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/courses', label: 'My Courses', icon: BookOpen },
  { href: '/students', label: 'My Students', icon: Users },
];

const studentMenuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/courses', label: 'My Courses', icon: BookOpen },
  { href: '/grades', label: 'My Grades', icon: GraduationCap },
];

export function SideMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setUserType(decodedToken.role);
      } catch (error) {
        console.error('Failed to decode token:', error);
        setUserType(null);
      }
    } else {
      setUserType(null);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserType(null);
    router.push('/login');
  };

  let menuItems: any[];
  switch (userType) {
    case 'Admin':
      menuItems = adminMenuItems;
      break;
    case 'Teachers':
      menuItems = teacherMenuItems;
      break;
    case 'Students':
      menuItems = studentMenuItems;
      break;
    default:
      menuItems = [];
  }

  if (!userType || pathname === '/login' || pathname === '/signup') {
    return null;
  }

  return (
    <nav className="w-64 bg-gray-100 h-screen p-4">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href} passHref legacyBehavior>
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start hover:bg-primary hover:text-primary-foreground',
                pathname === item.href ? 'bg-primary text-primary-foreground' : 'text-foreground'
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}
        <Button
          variant="ghost"
          className="w-full justify-start text-foreground hover:bg-primary hover:text-primary-foreground"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </nav>
  );
}