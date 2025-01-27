"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

export default function EditCourseForm({ id }: { id: string }) {
  const [course, setCourse] = useState({ name: '', description: '' });
  const router = useRouter();

  useEffect(() => {
    // In a real application, you would fetch the course data from an API
    // For this example, we'll use mock data
    const mockCourse = {
      id,
      name: 'Mock Course Name',
      description: 'Mock Course Description'
    };
    setCourse(mockCourse);
  }, [id]);

  const handleSave = () => {
    // In a real application, you would send the updated data to an API
    console.log('Saving course:', course);
    router.push('/courses');
  };

  const handleCancel = () => {
    router.push('/courses');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Course</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Course Name</label>
              <Input
                id="name"
                value={course.name}
                onChange={(e) => setCourse({ ...course, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <Input
                id="description"
                value={course.description}
                onChange={(e) => setCourse({ ...course, description: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}