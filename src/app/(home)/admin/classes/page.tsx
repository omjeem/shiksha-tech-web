"use client";

import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import ClassList from '@/components/Class/ClassList';
import ClassForm from '@/components/Class/ClassForm';
import SectionForm from '@/components/Class/SectionForm';
import { ClassName_Enum } from '@/components/Student/StudentForm';
import { ClassData, ClassDataCustomOrder, SectionData } from '@/utils/types/class';
import { getAllCLassesName, getAllClasses } from '@/redux/selector/classSelector';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addClass, addNewSection, fetchAllClasses } from '@/redux/store/class/classThunk';
import { AppDispatch } from '@/redux/store';


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function ClassPage() {
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const classSelector = useSelector(getAllClasses)
  const allClasses = [...classSelector.data]

  const classes = allClasses.sort(
    (a, b) =>
      ClassDataCustomOrder.indexOf(a.className) - ClassDataCustomOrder.indexOf(b.className)
  );
  const dispatch = useDispatch<AppDispatch>()


  useEffect(() => {
    dispatch(fetchAllClasses() as any)
  }, [])

  useEffect(() => {
    if (classSelector.error) {
      setErrorMessage(classSelector.error)
    }
    if (classSelector.success) {
      setSuccessMessage(classSelector.success)
    }
  }, [classSelector])



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

  const handleAddClass = (className: ClassName_Enum) => {
    try {

    } catch (error) {

    }
    dispatch(addClass(className))
  };

  const handleEditClass = (updatedClass: ClassData) => {
    try {
      // Simulate API call for updating class
     
     
    } catch (error) {
      console.error('Error updating class:', error);
      setErrorMessage('Failed to update class.');
    }
  };

  const handleDeleteClass = (classId: string) => {
    try {
      // Simulate API call for deleting class
      setSuccessMessage('Class deleted successfully!');
    } catch (error) {
      console.error('Error deleting class:', error);
      setErrorMessage('Failed to delete class.');
    }
  };


  const handleAddSection = (section: SectionData) => {
    dispatch(addNewSection(section))
  };

  const handleDeleteSection = (classId: string, sectionId: string) => {
    try {
      // Simulate API call for deleting section
      

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