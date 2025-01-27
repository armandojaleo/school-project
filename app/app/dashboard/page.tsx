"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';
import TeacherDashboard from '@/components/TeacherDashboard';
import StudentDashboard from '@/components/StudentDashboard';
import { jwtDecode } from 'jwt-decode';

export default function Dashboard() {
  const [userType, setUserType] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setUserType(decodedToken.role);
      } catch (error) {
        console.error('Failed to decode token:', error);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  if (userType === null) {
    return <div>Loading...</div>;
  }

  switch (userType) {
    case 'Admin':
      return <AdminDashboard />;
    case 'Teachers':
      return <TeacherDashboard />;
    case 'Students':
      return <StudentDashboard />;
    default:
      router.push('/login');
      return null;
  }
}