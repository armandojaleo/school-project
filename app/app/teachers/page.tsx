"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import { fetchData, createData, updateData, deleteData } from '@/lib/api';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({ name: '', subject: '', school: '' });
  const [editingTeacher, setEditingTeacher] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchData('/teachers', token)
        .then(data => setTeachers(data))
        .catch(error => console.error('Failed to fetch teachers:', error));
    }
  }, []);

  const addTeacher = async () => {
    if (newTeacher.name && newTeacher.subject && newTeacher.school) {
      const token = localStorage.getItem('token');
      try {
        const addedTeacher = await createData('/teachers', newTeacher, token);
        setTeachers([...teachers, addedTeacher]);
        setNewTeacher({ name: '', subject: '', school: '' });
      } catch (error) {
        console.error('Failed to add teacher:', error);
      }
    }
  };

  const updateTeacher = async () => {
    if (editingTeacher) {
      const token = localStorage.getItem('token');
      try {
        const updatedTeacher = await updateData(`/teachers/${editingTeacher.id}`, editingTeacher, token);
        setTeachers(teachers.map(teacher => teacher.id === updatedTeacher.id ? updatedTeacher : teacher));
        setEditingTeacher(null);
      } catch (error) {
        console.error('Failed to update teacher:', error);
      }
    }
  };

  const deleteTeacher = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await deleteData(`/teachers/${id}`, token);
      setTeachers(teachers.filter(teacher => teacher.id !== id));
    } catch (error) {
      console.error('Failed to delete teacher:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Teachers</h1>
      <div className="mb-6 flex gap-4">
        <Input
          placeholder="Teacher Name"
          value={editingTeacher ? editingTeacher.name : newTeacher.name}
          onChange={(e) => editingTeacher 
            ? setEditingTeacher({...editingTeacher, name: e.target.value})
            : setNewTeacher({ ...newTeacher, name: e.target.value })}
        />
        <Input
          placeholder="Subject"
          value={editingTeacher ? editingTeacher.subject : newTeacher.subject}
          onChange={(e) => editingTeacher
            ? setEditingTeacher({...editingTeacher, subject: e.target.value})
            : setNewTeacher({ ...newTeacher, subject: e.target.value })}
        />
        <Input
          placeholder="School"
          value={editingTeacher ? editingTeacher.school : newTeacher.school}
          onChange={(e) => editingTeacher
            ? setEditingTeacher({...editingTeacher, school: e.target.value})
            : setNewTeacher({ ...newTeacher, school: e.target.value })}
        />
        {editingTeacher ? (
          <Button onClick={updateTeacher}>Update Teacher</Button>
        ) : (
          <Button onClick={addTeacher}>Add Teacher</Button>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>School</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.map((teacher) => (
            <TableRow key={teacher.id}>
              <TableCell>{teacher.id}</TableCell>
              <TableCell>{teacher.name}</TableCell>
              <TableCell>{teacher.subject}</TableCell>
              <TableCell>{teacher.school}</TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => setEditingTeacher(teacher)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" onClick={() => deleteTeacher(teacher.id)}>
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