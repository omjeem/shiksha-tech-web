'use client';

import { useState } from 'react';
import { Class, Section } from '@/utils/types/class';
import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';

interface SectionFormProps {
  classes: Class[];
  onSubmit: (classId: string, sectionData: Omit<Section, 'id' | 'serial' | 'createdAt' | 'updatedAt'>) => void;
  schoolId: string;
}

export default function SectionForm({ classes, onSubmit, schoolId }: SectionFormProps) {
  const [selectedClassId, setSelectedClassId] = useState('');
  const [sectionName, setSectionName] = useState('');
  const [classTeacherId, setClassTeacherId] = useState('');
  const [classMonitorId, setClassMonitorId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedClassId) {
      alert('Please select a class');
      return;
    }
    
    if (!sectionName) {
      alert('Please enter a section name');
      return;
    }
    
    // Check if section name already exists for this class
    const selectedClass = classes.find(c => c.id === selectedClassId);
    if (selectedClass && selectedClass.sections.some(s => s.sectionName.toLowerCase() === sectionName.toLowerCase())) {
      alert(`Section ${sectionName} already exists for this class`);
      return;
    }
    
    const sectionData = {
      schoolId,
      classId: selectedClassId,
      sectionName,
      totalStudent: 0, // New section starts with 0 students
      classTeacherId: classTeacherId || undefined,
      classMonitorId: classMonitorId || undefined,
    };
    
    onSubmit(selectedClassId, sectionData);
    
    // Reset form
    setSectionName('');
    setClassTeacherId('');
    setClassMonitorId('');
  };

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Add New Section
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="classId" className="block text-sm font-medium text-gray-700 mb-1">
            Class *
          </label>
          <select
            id="classId"
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Class</option>
            {classes.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                Class {classItem.className}
              </option>
            ))}
          </select>
        </div>
        
        <Input
          id="sectionName"
          label="Section Name *"
          placeholder="e.g., A, B, C"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value.toUpperCase())}
          helperText="Enter a single letter or short name for the section (e.g., A, B, C)"
          maxLength={5}
          required
        />
        
        <Input
          id="classTeacherId"
          label="Class Teacher ID"
          placeholder="Enter teacher ID (optional)"
          value={classTeacherId}
          onChange={(e) => setClassTeacherId(e.target.value)}
          helperText="Optional: Assign a teacher to this section"
        />
        
        <Input
          id="classMonitorId"
          label="Class Monitor ID"
          placeholder="Enter student ID (optional)"
          value={classMonitorId}
          onChange={(e) => setClassMonitorId(e.target.value)}
          helperText="Optional: Assign a student as class monitor"
        />
        
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
          >
            Add Section
          </Button>
        </div>
      </form>
    </div>
  );
} 