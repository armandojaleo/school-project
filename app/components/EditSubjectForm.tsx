"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EditSubjectForm({ id }: { id: string }) {
  const [subject, setSubject] = useState({ name: '', course: '' });
  const [courses, setCourses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // In a real application, you would fetch the subject data and courses from an API
    // For this example, we'll use mock data
    const mockSubject = {
      id,
      name: 'Mock Subject Name',
      course: 'Mathematics'
    };
    setSubject(mockSubject);
    setCourses(['Mathematics', 'Science', 'History', 'Literature']);
  }, [id]);

  const handleSave = () => {
    // In a real application, you would send the updated data to an API
    console.log('Saving subject:', subject);
    router.push('/subjects');
  };

  const handleCancel = () => {
    router.push('/subjects');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Subject</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Subject Name</label>
              <Input
                id="name"
                value={subject.name}
                onChange={(e) => setSubject({ ...subject, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course</label>
              <Select
                value={subject.course}
                onValueChange={(value) => setSubject({ ...subject, course: value })}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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