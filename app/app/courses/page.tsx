"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import { fetchData, createData, updateData, deleteData } from '@/lib/api';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: '', description: '' });
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchData('/courses', token)
        .then(data => setCourses(data))
        .catch(error => console.error('Failed to fetch courses:', error));
    }
  }, []);

  const addCourse = async () => {
    if (newCourse.name && newCourse.description) {
      const token = localStorage.getItem('token');
      try {
        const addedCourse = await createData('/courses', newCourse, token);
        setCourses([...courses, addedCourse]);
        setNewCourse({ name: '', description: '' });
      } catch (error) {
        console.error('Failed to add course:', error);
      }
    }
  };

  const updateCourse = async () => {
    if (editingCourse) {
      const token = localStorage.getItem('token');
      try {
        const updatedCourse = await updateData(`/courses/${editingCourse.id}`, editingCourse, token);
        setCourses(courses.map(course => course.id === updatedCourse.id ? updatedCourse : course));
        setEditingCourse(null);
      } catch (error) {
        console.error('Failed to update course:', error);
      }
    }
  };

  const deleteCourse = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await deleteData(`/courses/${id}`, token);
      setCourses(courses.filter(course => course.id !== id));
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Courses</h1>
      <div className="mb-6 flex gap-4">
        <Input
          placeholder="Course Name"
          value={editingCourse ? editingCourse.name : newCourse.name}
          onChange={(e) => editingCourse 
            ? setEditingCourse({...editingCourse, name: e.target.value})
            : setNewCourse({ ...newCourse, name: e.target.value })}
        />
        <Input
          placeholder="Description"
          value={editingCourse ? editingCourse.description : newCourse.description}
          onChange={(e) => editingCourse
            ? setEditingCourse({...editingCourse, description: e.target.value})
            : setNewCourse({ ...newCourse, description: e.target.value })}
        />
        {editingCourse ? (
          <Button onClick={updateCourse}>Update Course</Button>
        ) : (
          <Button onClick={addCourse}>Add Course</Button>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.id}</TableCell>
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.description}</TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => setEditingCourse(course)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" onClick={() => deleteCourse(course.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}