"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, Trash2 } from 'lucide-react';
import { fetchData, createData, updateData, deleteData } from '@/lib/api';

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({ name: '', course: '' });
  const [editingSubject, setEditingSubject] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchData('/subjects', token)
        .then(data => setSubjects(data))
        .catch(error => console.error('Failed to fetch subjects:', error));
      
      fetchData('/courses', token)
        .then(data => setCourses(data))
        .catch(error => console.error('Failed to fetch courses:', error));
    }
  }, []);

  const addSubject = async () => {
    if (newSubject.name && newSubject.course) {
      const token = localStorage.getItem('token');
      try {
        const addedSubject = await createData('/subjects', newSubject, token);
        setSubjects([...subjects, addedSubject]);
        setNewSubject({ name: '', course: '' });
      } catch (error) {
        console.error('Failed to add subject:', error);
      }
    }
  };

  const updateSubject = async () => {
    if (editingSubject) {
      const token = localStorage.getItem('token');
      try {
        const updatedSubject = await updateData(`/subjects/${editingSubject.id}`, editingSubject, token);
        setSubjects(subjects.map(subject => subject.id === updatedSubject.id ? updatedSubject : subject));
        setEditingSubject(null);
      } catch (error) {
        console.error('Failed to update subject:', error);
      }
    }
  };

  const deleteSubject = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await deleteData(`/subjects/${id}`, token);
      setSubjects(subjects.filter(subject => subject.id !== id));
    } catch (error) {
      console.error('Failed to delete subject:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Subjects</h1>
      <div className="mb-6 flex gap-4">
        <Input
          placeholder="Subject Name"
          value={editingSubject ? editingSubject.name : newSubject.name}
          onChange={(e) => editingSubject 
            ? setEditingSubject({...editingSubject, name: e.target.value})
            : setNewSubject({ ...newSubject, name: e.target.value })}
        />
        <Select
          value={editingSubject ? editingSubject.course : newSubject.course}
          onValueChange={(value) => editingSubject
            ? setEditingSubject({...editingSubject, course: value})
            : setNewSubject({ ...newSubject, course: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((course) => (
              <SelectItem key={course.id} value={course.id}>
                {course.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {editingSubject ? (
          <Button onClick={updateSubject}>Update Subject</Button>
        ) : (
          <Button onClick={addSubject}>Add Subject</Button>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((subject) => (
            <TableRow key={subject.id}>
              <TableCell>{subject.id}</TableCell>
              <TableCell>{subject.name}</TableCell>
              <TableCell>{courses.find(c => c.id === subject.course)?.name}</TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => setEditingSubject(subject)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" onClick={() => deleteSubject(subject.id)}>
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