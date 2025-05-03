"use client";

import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import ClassList from '@/components/Class/ClassList';
import ClassForm from '@/components/Class/ClassForm';
import SectionForm from '@/components/Class/SectionForm';
import { ClassName_Enum } from '@/components/Student/StudentForm';
import { Class, Section } from '@/utils/types/class';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// Simulated data
const initialClasses: Class[] = [
  {
    id: "1",
    serial: 1,
    schoolId: "school1",
    className: ClassName_Enum.ONE,
    totalSection: 2,
    totalStudent: 45,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sections: [
      {
        id: "101",
        serial: 1,
        schoolId: "school1",
        classId: "1",
        sectionName: "A",
        totalStudent: 23,
        classMonitorId: "student1",
        classTeacherId: "teacher1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "102",
        serial: 2,
        schoolId: "school1",
        classId: "1",
        sectionName: "B",
        totalStudent: 22,
        classMonitorId: "student2",
        classTeacherId: "teacher2",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ]
  },
  {
    id: "2",
    serial: 2,
    schoolId: "school1",
    className: ClassName_Enum.TWO,
    totalSection: 2,
    totalStudent: 50,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sections: [
      {
        id: "201",
        serial: 3,
        schoolId: "school1",
        classId: "2",
        sectionName: "A",
        totalStudent: 25,
        classMonitorId: "student3",
        classTeacherId: "teacher3",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "202",
        serial: 4,
        schoolId: "school1",
        classId: "2",
        sectionName: "B",
        totalStudent: 25,
        classMonitorId: "student4",
        classTeacherId: "teacher4",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ]
  },
  {
    id: "3",
    serial: 3,
    schoolId: "school1",
    className: ClassName_Enum.THREE,
    totalSection: 1,
    totalStudent: 30,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sections: [
      {
        id: "301",
        serial: 5,
        schoolId: "school1",
        classId: "3",
        sectionName: "A",
        totalStudent: 30,
        classMonitorId: "student5",
        classTeacherId: "teacher5",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ]
  }
];

export default function ClassPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Simulating API fetch
  useEffect(() => {
    // In a real app, this would be an API call
    setClasses(initialClasses);
  }, []);

  // Show success/error messages temporarily
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleAddClass = (newClass: Omit<Class, 'id' | 'serial' | 'createdAt' | 'updatedAt' | 'sections'>) => {
    try {
      // Simulate API call for creating class
      const newId = (classes.length + 1).toString();
      const createdClass: Class = {
        id: newId,
        serial: classes.length + 1,
        schoolId: newClass.schoolId,
        className: newClass.className,
        totalSection: 0, // Initially 0 sections
        totalStudent: 0, // Initially 0 students
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sections: [] // Initially no sections
      };
      
      setClasses(prev => [...prev, createdClass]);
      setSuccessMessage('Class added successfully!');
    } catch (error) {
      console.error('Error adding class:', error);
      setErrorMessage('Failed to add class.');
    }
  };

  const handleEditClass = (updatedClass: Class) => {
    try {
      // Simulate API call for updating class
      const updatedClasses = classes.map(c => 
        c.id === updatedClass.id ? updatedClass : c
      );
      
      setClasses(updatedClasses);
      setSelectedClass(null);
      setIsEditMode(false);
      setSuccessMessage('Class updated successfully!');
    } catch (error) {
      console.error('Error updating class:', error);
      setErrorMessage('Failed to update class.');
    }
  };

  const handleDeleteClass = (classId: string) => {
    try {
      // Simulate API call for deleting class
      setClasses(prev => prev.filter(c => c.id !== classId));
      setSuccessMessage('Class deleted successfully!');
    } catch (error) {
      console.error('Error deleting class:', error);
      setErrorMessage('Failed to delete class.');
    }
  };

  const handleAddSection = (classId: string, newSection: Omit<Section, 'id' | 'serial' | 'createdAt' | 'updatedAt'>) => {
    try {
      // Simulate API call for adding section
      const updatedClasses = classes.map(c => {
        if (c.id === classId) {
          // Create a new section
          const sectionId = `${c.id}${c.sections.length + 1}`;
          const createdSection: Section = {
            id: sectionId,
            serial: c.sections.length + 1,
            schoolId: newSection.schoolId,
            classId: classId,
            sectionName: newSection.sectionName,
            totalStudent: 0, // Initially 0 students
            classMonitorId: newSection.classMonitorId,
            classTeacherId: newSection.classTeacherId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          // Update the class with the new section
          return {
            ...c,
            totalSection: c.totalSection + 1,
            sections: [...c.sections, createdSection]
          };
        }
        return c;
      });
      
      setClasses(updatedClasses);
      setSuccessMessage('Section added successfully!');
    } catch (error) {
      console.error('Error adding section:', error);
      setErrorMessage('Failed to add section.');
    }
  };

  const handleDeleteSection = (classId: string, sectionId: string) => {
    try {
      // Simulate API call for deleting section
      const updatedClasses = classes.map(c => {
        if (c.id === classId) {
          const updatedSections = c.sections.filter(s => s.id !== sectionId);
          return {
            ...c,
            totalSection: updatedSections.length,
            sections: updatedSections
          };
        }
        return c;
      });
      
      setClasses(updatedClasses);
      setSuccessMessage('Section deleted successfully!');
    } catch (error) {
      console.error('Error deleting section:', error);
      setErrorMessage('Failed to delete section.');
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Class Management</h1>
        <p className="mt-2 text-sm text-gray-600">
          Add, edit, and manage classes and sections in your school.
        </p>
      </div>

      {/* Success and Error Messages */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMessage}
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <Tab.Group>
          <Tab.List className="flex border-b border-gray-200">
            <Tab
              className={({ selected }: { selected: boolean }) =>
                classNames(
                  'py-4 px-6 text-sm font-medium focus:outline-none',
                  selected
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )
              }
            >
              Manage Classes
            </Tab>
            <Tab
              className={({ selected }: { selected: boolean }) =>
                classNames(
                  'py-4 px-6 text-sm font-medium focus:outline-none',
                  selected
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )
              }
            >
              Add New Class
            </Tab>
            <Tab
              className={({ selected }: { selected: boolean }) =>
                classNames(
                  'py-4 px-6 text-sm font-medium focus:outline-none',
                  selected
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )
              }
            >
              Add New Section
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className="p-6">
              <ClassList 
                classes={classes} 
                onEdit={(classItem) => {
                  setSelectedClass(classItem);
                  setIsEditMode(true);
                }}
                onDelete={handleDeleteClass}
                onDeleteSection={handleDeleteSection}
              />
            </Tab.Panel>
            <Tab.Panel className="p-6">
              <ClassForm 
                onSubmit={handleAddClass} 
                initialData={isEditMode ? selectedClass : null}
                isEdit={isEditMode}
                schoolId="school1" // In a real app, this would come from context/auth
              />
            </Tab.Panel>
            <Tab.Panel className="p-6">
              <SectionForm 
                classes={classes}
                onSubmit={handleAddSection}
                schoolId="school1" // In a real app, this would come from context/auth
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}