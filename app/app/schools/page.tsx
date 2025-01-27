"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import { fetchData, createData, updateData, deleteData } from '@/lib/api';

export default function Schools() {
  const [schools, setSchools] = useState([]);
  const [newSchool, setNewSchool] = useState({ name: '', address: '' });
  const [editingSchool, setEditingSchool] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchData('/schools', token)
        .then(data => setSchools(data))
        .catch(error => console.error('Failed to fetch schools:', error));
    }
  }, []);

  const addSchool = async () => {
    if (newSchool.name && newSchool.address) {
      const token = localStorage.getItem('token');
      try {
        const addedSchool = await createData('/schools', newSchool, token);
        setSchools([...schools, addedSchool]);
        setNewSchool({ name: '', address: '' });
      } catch (error) {
        console.error('Failed to add school:', error);
      }
    }
  };

  const updateSchool = async () => {
    if (editingSchool) {
      const token = localStorage.getItem('token');
      try {
        const updatedSchool = await updateData(`/schools/${editingSchool.id}`, editingSchool, token);
        setSchools(schools.map(school => school.id === updatedSchool.id ? updatedSchool : school));
        setEditingSchool(null);
      } catch (error) {
        console.error('Failed to update school:', error);
      }
    }
  };

  const deleteSchool = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await deleteData(`/schools/${id}`, token);
      setSchools(schools.filter(school => school.id !== id));
    } catch (error) {
      console.error('Failed to delete school:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Schools</h1>
      <div className="mb-6 flex gap-4">
        <Input
          placeholder="School Name"
          value={editingSchool ? editingSchool.name : newSchool.name}
          onChange={(e) => editingSchool 
            ? setEditingSchool({...editingSchool, name: e.target.value})
            : setNewSchool({ ...newSchool, name: e.target.value })}
        />
        <Input
          placeholder="Address"
          value={editingSchool ? editingSchool.address : newSchool.address}
          onChange={(e) => editingSchool
            ? setEditingSchool({...editingSchool, address: e.target.value})
            : setNewSchool({ ...newSchool, address: e.target.value })}
        />
        {editingSchool ? (
          <Button onClick={updateSchool}>Update School</Button>
        ) : (
          <Button onClick={addSchool}>Add School</Button>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schools.map((school) => (
            <TableRow key={school.id}>
              <TableCell>{school.id}</TableCell>
              <TableCell>{school.name}</TableCell>
              <TableCell>{school.address}</TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => setEditingSchool(school)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" onClick={() => deleteSchool(school.id)}>
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