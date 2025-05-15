"use client"
import { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import StudentForm from '@/components/Student/StudentForm';
import BulkImport from '@/components/Student/BulkImport';
import StudentTable from '@/components/Student/StudentTable';
import EditStudentModal from '@/components/Student/EditStudentModal';
import { useDispatch } from 'react-redux';
import { fetchAllClasses } from '@/redux/store/class/classThunk';
import { StudentData } from '@/utils/types/student';
import apiServices from '@/services';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function StudentPage() {
    const [students, setStudents] = useState<StudentData[]>([]);
    const [editingStudent, setEditingStudent] = useState<StudentData | null>(null);
    const [editingIndex, setEditingIndex] = useState<number>(-1);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllClasses() as any)
    }, [])

    useEffect(() => {
        const fetchStudentsData = async () => {
            try {
                const data = await apiServices.student.getAllStudents()
                setStudents(data.data)
                console.log("Data is >>>>>>>>>>>>>", data)
            } catch (error) {
                console.log("Error is ", error)
            }
        }
        fetchStudentsData()
    }, [])


    useEffect(() => {
        try {
            const savedStudents = localStorage.getItem('shiksha_students');
            if (savedStudents) {
                setStudents(JSON.parse(savedStudents));
            }
        } catch (error) {
            console.error('Failed to load students:', error);
        }
    }, []);

    // Save students to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('shiksha_students', JSON.stringify(students));
        } catch (error) {
            console.error('Failed to save students:', error);
        }
    }, [students]);

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

    const handleAddStudent = async (student: StudentData) => {
        // try {
        //     setStudents(prev => [...prev, student]);
        //     setSuccessMessage('Student added successfully!');
        // } catch (error) {
        //     console.error('Error adding student:', error);
        //     setErrorMessage('Failed to add student.');
        // }
        console.log("Student is ", student)
        try {
            const response = await apiServices.student.addStudent(student)
            console.log("Response is ", response)
            setSuccessMessage('Student added successfully!');
        } catch (error) {
            console.log("Error is ", error)
            setErrorMessage(String(error) || `Failed to add student.`);
        }

    };

    const handleImportStudents = (importedStudents: StudentData[]) => {
        try {
            setStudents(prev => [...prev, ...importedStudents]);
            setSuccessMessage(`${importedStudents.length} students imported successfully!`);
        } catch (error) {
            console.error('Error importing students:', error);
            setErrorMessage('Failed to import students.');
        }
    };

    const handleEditStudent = (student: StudentData, index: number) => {
        setEditingStudent(student);
        setEditingIndex(index);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = (updatedStudent: StudentData) => {
        try {
            const updatedStudents = [...students];
            updatedStudents[editingIndex] = updatedStudent;
            setStudents(updatedStudents);
            setSuccessMessage('Student updated successfully!');
        } catch (error) {
            console.error('Error updating student:', error);
            setErrorMessage('Failed to update student.');
        }
    };

    const handleDeleteStudent = (index: number) => {
        try {
            // const updatedStudents = [...students];
            // updatedStudents.splice(index, 1);
            // setStudents(updatedStudents);
            // setSuccessMessage('Student deleted successfully!');
        } catch (error) {
            console.error('Error deleting student:', error);
            setErrorMessage('Failed to delete student.');
        }
    };

    const handleBulkDeleteStudents = (indices: number[]) => {
        try {
            const updatedStudents = [...students];
            indices.forEach(index => {
                updatedStudents.splice(index, 1);
            });
            setStudents(updatedStudents);
            setSuccessMessage(`${indices.length} students deleted successfully!`);
        } catch (error) {
            console.error('Error deleting students:', error);
            setErrorMessage('Failed to delete students.');
        }
    };

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Add, import, edit, and manage students in your school.
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
                            Add Student
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
                            Bulk Import
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
                            Manage Students
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel className="p-6">
                            <StudentForm onSubmit={handleAddStudent} />
                        </Tab.Panel>
                        <Tab.Panel className="p-6">
                            <BulkImport onImport={handleImportStudents} />
                        </Tab.Panel>
                        <Tab.Panel className="py-4">
                            <StudentTable
                                students={students}
                                onEdit={handleEditStudent}
                                onDelete={handleDeleteStudent}
                                onBulkDelete={handleBulkDeleteStudents}
                            />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>

            {/* Edit Student Modal */}
            <EditStudentModal
                student={editingStudent}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSaveEdit}
            />
        </div>
    );
}
