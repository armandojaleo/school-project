"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

export default function EditSchoolForm({ id }: { id: string }) {
  const [school, setSchool] = useState({ name: '', address: '' });
  const router = useRouter();

  useEffect(() => {
    // In a real application, you would fetch the school data from an API
    // For this example, we'll use mock data
    const mockSchool = {
      id,
      name: 'Mock School Name',
      address: 'Mock School Address'
    };
    setSchool(mockSchool);
  }, [id]);

  const handleSave = () => {
    // In a real application, you would send the updated data to an API
    console.log('Saving school:', school);
    router.push('/schools');
  };

  const handleCancel = () => {
    router.push('/schools');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Edit School</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">School Name</label>
              <Input
                id="name"
                value={school.name}
                onChange={(e) => setSchool({ ...school, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <Input
                id="address"
                value={school.address}
                onChange={(e) => setSchool({ ...school, address: e.target.value })}
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