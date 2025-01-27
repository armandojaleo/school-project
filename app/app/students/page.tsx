"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import { fetchData, createData, updateData, deleteData } from '@/lib/api';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', grade: '', school: '' });
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchData('/students', token)
        .then(data => setStudents(data))
        .catch(error => console.error('Failed to fetch students:', error));
    }
  }, []);

  const addStudent = async () => {
    if (newStudent.name && newStudent.grade && newStudent.school) {
      const token = localStorage.getItem('token');
      try {
        const addedStudent = await createData('/students', newStudent, token);
        setStudents([...students, addedStudent]);
        setNewStudent({ name: '', grade: '', school: '' });
      } catch (error) {
        console.error('Failed to add student:', error);
      }
    }
  };

  const updateStudent = async () => {
    if (editingStudent) {
      const token = localStorage.getItem('token');
      try {
        const updatedStudent = await updateData(`/students/${editingStudent.id}`, editingStudent, token);
        setStudents(students.map(student => student.id === updatedStudent.id ? updatedStudent : student));
        setEditingStudent(null);
      } catch (error) {
        console.error('Failed to update student:', error);
      }
    }
  };

  const deleteStudent = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await deleteData(`/students/${id}`, token);
      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      console.error('Failed to delete student:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Students</h1>
      <div className="mb-6 flex gap-4">
        <Input
          placeholder="Student Name"
          value={editingStudent ? editingStudent.name : newStudent.name}
          onChange={(e) => editingStudent 
            ? setEditingStudent({...editingStudent, name: e.target.value})
            : setNewStudent({ ...newStudent, name: e.target.value })}
        />
        <Input
          placeholder="Grade"
          value={editingStudent ? editingStudent.grade : newStudent.grade}
          onChange={(e) => editingStudent
            ? setEditingStudent({...editingStudent, grade: e.target.value})
            : setNewStudent({ ...newStudent, grade: e.target.value })}
        />
        <Input
          placeholder="School"
          value={editingStudent ? editingStudent.school : newStudent.school}
          onChange={(e) => editingStudent
            ? setEditingStudent({...editingStudent, school: e.target.value})
            : setNewStudent({ ...newStudent, school: e.target.value })}
        />
        {editingStudent ? (
          <Button onClick={updateStudent}>Update Student</Button>
        ) : (
          <Button onClick={addStudent}>Add Student</Button>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>School</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.grade}</TableCell>
              <TableCell>{student.school}</TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => setEditingStudent(student)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" onClick={() => deleteStudent(student.id)}>
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