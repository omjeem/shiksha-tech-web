'use client';

import { useState, useRef } from 'react';
import { StudentData, ClassName_Enum, Gender_Enum } from './StudentForm';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

interface BulkImportProps {
  onImport: (students: StudentData[]) => void;
  schoolId?: string; // Optional for now, would be required in production
}

export default function BulkImport({ onImport, schoolId }: BulkImportProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [importedData, setImportedData] = useState<StudentData[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [preparingToSubmit, setPreparingToSubmit] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassName_Enum | ''>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Required fields for validation
  const requiredFields = [
    'srNo',
    'name',
    'rollNo',
    'email',
    'gender',
    'dob',
    'admissionClass',
    'admissionDate'
  ];

  // Field mapping to help match CSV/Excel headers to our data fields
  const fieldMapping: Record<string, string> = {
    'sr no': 'srNo',
    'sr. no': 'srNo',
    'serial no': 'srNo',
    'serial number': 'srNo',
    'name': 'name',
    'student name': 'name',
    'full name': 'name',
    'roll no': 'rollNo',
    'roll number': 'rollNo',
    'roll': 'rollNo',
    'email': 'email',
    'email address': 'email',
    'gender': 'gender',
    'sex': 'gender',
    'date of birth': 'dob',
    'dob': 'dob',
    'birth date': 'dob',
    'class': 'admissionClass',
    'admission class': 'admissionClass',
    'section': 'admissionSection',
    'admission section': 'admissionSection',
    'admission date': 'admissionDate',
    'date of admission': 'admissionDate',
    'address': 'address',
    'father name': 'fatherName',
    'father\'s name': 'fatherName',
    'father contact': 'fatherContact',
    'father\'s contact': 'fatherContact',
    'father email': 'fatherEmail',
    'father\'s email': 'fatherEmail',
    'mother name': 'motherName',
    'mother\'s name': 'motherName',
    'mother contact': 'motherContact',
    'mother\'s contact': 'motherContact',
    'mother email': 'motherEmail',
    'mother\'s email': 'motherEmail',
  };

  // Helper function to convert Excel date numbers to JavaScript Date objects
  const excelDateToJSDate = (excelDate: number): Date => {
    // Excel dates are number of days since Dec 30, 1899
    const utcDays = excelDate - 25569; // 25569 is the number of days from 1/1/1900 to 1/1/1970
    const milliseconds = utcDays * 86400000; // 86400000 = 24 * 60 * 60 * 1000
    return new Date(milliseconds);
  };

  const parseExcelFile = async (file: File): Promise<StudentData[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const excelData = XLSX.utils.sheet_to_json(worksheet);
          
          // Transform Excel data to match our StudentData interface
          const transformedData = excelData.map((row: any, index: number) => {
            // Process headers - convert to lowercase and match with our field mapping
            const processedRow: Record<string, any> = {};
            Object.keys(row).forEach((key) => {
              const lowerKey = key.toLowerCase();
              const mappedField = fieldMapping[lowerKey] || lowerKey;
              processedRow[mappedField] = row[key];
            });

            // Convert date fields
            const dobValue = processedRow.dob;
            let formattedDob = '';
            if (dobValue) {
              if (typeof dobValue === 'number') {
                formattedDob = excelDateToJSDate(dobValue).toISOString().split('T')[0];
              } else {
                // Try to parse as string date
                formattedDob = new Date(dobValue).toISOString().split('T')[0];
              }
            }

            const admissionDateValue = processedRow.admissionDate;
            let formattedAdmissionDate = '';
            if (admissionDateValue) {
              if (typeof admissionDateValue === 'number') {
                formattedAdmissionDate = excelDateToJSDate(admissionDateValue).toISOString().split('T')[0];
              } else {
                // Try to parse as string date
                formattedAdmissionDate = new Date(admissionDateValue).toISOString().split('T')[0];
              }
            }
            
            // Map gender value to Gender_Enum
            let genderValue = Gender_Enum.MALE; // Default value
            if (processedRow.gender) {
              const gender = String(processedRow.gender).toUpperCase();
              if (gender === 'FEMALE' || gender === 'F') {
                genderValue = Gender_Enum.FEMALE;
              } else if (gender === 'OTHER' || gender === 'O') {
                genderValue = Gender_Enum.OTHER;
              }
            }
            
            // Create StudentData object with all required fields
            return {
              srNo: processedRow.srNo ? parseInt(String(processedRow.srNo), 10) : index + 1,
              name: processedRow.name || '',
              rollNo: processedRow.rollNo ? parseInt(String(processedRow.rollNo), 10) : 0,
              email: processedRow.email || '',
              password: '', // Will be auto-generated if not provided
              gender: genderValue,
              dob: formattedDob,
              admissionClass: processedRow.admissionClass || '',
              admissionSection: processedRow.admissionSection || '',
              admissionDate: formattedAdmissionDate,
              address: processedRow.address || '',
              fatherName: processedRow.fatherName || '',
              fatherContact: processedRow.fatherContact || '',
              fatherEmail: processedRow.fatherEmail || '',
              motherName: processedRow.motherName || '',
              motherContact: processedRow.motherContact || '',
              motherEmail: processedRow.motherEmail || '',
            } as StudentData;
          });
          
          resolve(transformedData);
        } catch (error) {
          reject(new Error('Failed to parse Excel file. Please check the format and try again.'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading the file. Please try again.'));
      };
      
      reader.readAsBinaryString(file);
    });
  };

  const parseCSVFile = async (file: File): Promise<StudentData[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const csvData = e.target?.result as string;
          // Parse CSV data using PapaParse
          Papa.parse(csvData, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              // Transform CSV data to match our StudentData interface
              const transformedData = results.data.map((row: any, index: number) => {
                // Process headers - convert to lowercase and match with our field mapping
                const processedRow: Record<string, any> = {};
                Object.keys(row).forEach((key) => {
                  const lowerKey = key.toLowerCase();
                  const mappedField = fieldMapping[lowerKey] || lowerKey;
                  processedRow[mappedField] = row[key];
                });
                
                // Map gender value to Gender_Enum
                let genderValue = Gender_Enum.MALE; // Default value
                if (processedRow.gender) {
                  const gender = String(processedRow.gender).toUpperCase();
                  if (gender === 'FEMALE' || gender === 'F') {
                    genderValue = Gender_Enum.FEMALE;
                  } else if (gender === 'OTHER' || gender === 'O') {
                    genderValue = Gender_Enum.OTHER;
                  }
                }
                
                // Create StudentData object with all required fields
                return {
                  srNo: processedRow.srNo ? parseInt(String(processedRow.srNo), 10) : index + 1,
                  name: processedRow.name || '',
                  rollNo: processedRow.rollNo ? parseInt(String(processedRow.rollNo), 10) : 0,
                  email: processedRow.email || '',
                  password: '', // Will be auto-generated if not provided
                  gender: genderValue,
                  dob: processedRow.dob || '',
                  admissionClass: processedRow.admissionClass || '',
                  admissionSection: processedRow.admissionSection || '',
                  admissionDate: processedRow.admissionDate || '',
                  address: processedRow.address || '',
                  fatherName: processedRow.fatherName || '',
                  fatherContact: processedRow.fatherContact || '',
                  fatherEmail: processedRow.fatherEmail || '',
                  motherName: processedRow.motherName || '',
                  motherContact: processedRow.motherContact || '',
                  motherEmail: processedRow.motherEmail || '',
                } as StudentData;
              });
              
              resolve(transformedData);
            },
            error: (error: { message: string }) => {
              reject(new Error(`Failed to parse CSV file: ${error.message}`));
            }
          });
        } catch (error) {
          reject(new Error('Failed to parse CSV file. Please check the format and try again.'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading the file. Please try again.'));
      };
      
      reader.readAsText(file);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setImportedData([]);
      setPreparingToSubmit(false);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setError(null);
    setSuccess(null);
    
    try {
      setIsImporting(true);
      
      const fileType = selectedFile.name.split('.').pop()?.toLowerCase();
      let parsedData: StudentData[] = [];
      
      if (fileType === 'xlsx' || fileType === 'xls') {
        parsedData = await parseExcelFile(selectedFile);
      } else if (fileType === 'csv') {
        parsedData = await parseCSVFile(selectedFile);
      } else {
        throw new Error('Unsupported file format. Please upload a CSV or Excel file.');
      }
      
      if (parsedData.length > 0) {
        setImportedData(parsedData);
        setPreparingToSubmit(true);
        setSuccess(`Successfully processed ${parsedData.length} student records. Please select a class and submit to complete the import.`);
      }
    } catch (error: unknown) {
      console.error('Import error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during import';
      setError(errorMessage);
      setSuccess(null);
    } finally {
      setIsImporting(false);
    }
  };

  const validateSRNumber = async (srNo: number): Promise<boolean> => {
    try {
      // This would typically be an API call to check if the SR number is unique
      // For now, we'll just simulate the validation
      return true;
      // In a real implementation, you would do something like:
      // const response = await fetch(`/api/students/validate-sr-number?srNo=${srNo}&schoolId=${schoolId}`);
      // return response.ok;
    } catch (error) {
      console.error('Error validating SR number:', error);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!selectedClass) {
      setError('Please select a class before submitting');
      return;
    }

    // Validate SR numbers before submission
    let hasInvalidSR = false;
    for (const student of importedData) {
      if (student.srNo) {
        const isValid = await validateSRNumber(student.srNo);
        if (!isValid) {
          setError(`SR Number ${student.srNo} is already in use. Please check your data.`);
          hasInvalidSR = true;
          break;
        }
      }
    }

    if (hasInvalidSR) return;

    // Add class information to all students
    const studentsWithClass = importedData.map(student => ({
      ...student,
      admissionClass: selectedClass
    }));

    try {
      // This would be your API call to save the students
      // For example:
      // const response = await fetch('/api/students/bulk-create', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ students: studentsWithClass, schoolId }),
      // });
      
      // if (!response.ok) throw new Error('Failed to import students');
      
      // Mock successful response
      console.log('Students to be imported:', studentsWithClass);
      setError(null);
      setSuccess(`Successfully imported ${studentsWithClass.length} students to the selected class`);
      
      // Reset form
      setSelectedFile(null);
      setImportedData([]);
      setSelectedClass('');
      setPreparingToSubmit(false);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error importing students:', error);
      setError('Failed to import students. Please try again.');
      setSuccess(null);
    }
  };

  const downloadTemplate = () => {
    // Create CSV content
    const headers = [
      'Sr No',
      'Name',
      'Roll No',
      'Email',
      'Gender', 
      'DOB',
      'Admission Class',
      'Admission Section',
      'Admission Date',
      'Address',
      'Father Name',
      'Father Contact',
      'Father Email',
      'Mother Name',
      'Mother Contact',
      'Mother Email'
    ].join(',');
    
    const sampleRow = [
      '1',
      'John Doe',
      '101',
      'john.doe@example.com',
      'MALE',
      '2005-01-01',
      'TEN', 
      'A',
      '2022-04-01',
      '123 Main St',
      'Robert Doe',
      '9876543210',
      'robert@example.com',
      'Jane Doe',
      '9876543211',
      'jane@example.com'
    ].join(',');
    
    const csvContent = `${headers}\n${sampleRow}`;
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'student_import_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-md">
        <h3 className="text-md font-medium text-blue-700 mb-2">Instructions</h3>
        <ul className="list-disc pl-5 text-sm text-blue-600 space-y-1">
          <li>Upload a CSV or Excel file with student information.</li>
          <li>The file must include the following required columns: Sr No, Name, Roll No, Email, Gender, DOB, Admission Class, and Admission Date.</li>
          <li>After importing, you will be able to map the class for all students.</li>
          <li><strong>Note:</strong> Sr No is required for bulk imports and must be unique.</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="mb-4">
            <label 
              htmlFor="file-upload" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Students File (Excel or CSV)
            </label>
            <input
              ref={fileInputRef}
              id="file-upload"
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            <p className="mt-1 text-sm text-gray-500">
              Upload an Excel or CSV file with student data
            </p>
          </div>

          <div className="mb-6">
            <a 
              href="/templates/student-import-template.xlsx" 
              download
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Download template file
            </a>
          </div>

          <button
            onClick={handleImport}
            disabled={!selectedFile || isImporting}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              !selectedFile || isImporting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isImporting ? 'Processing...' : 'Process File'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {importedData.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Imported {importedData.length} student{importedData.length !== 1 ? 's' : ''}
          </h3>
          
          {preparingToSubmit && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <h4 className="font-medium text-yellow-800 mb-2">Select Class</h4>
              <div className="flex items-center space-x-4">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value as ClassName_Enum)}
                  className="w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select Class</option>
                  {Object.values(ClassName_Enum).map((className) => (
                    <option key={className} value={className}>
                      {className.replace('_', ' ')}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleSubmit}
                  disabled={!selectedClass}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Students
                </button>
              </div>
              <p className="text-sm text-yellow-700 mt-2">
                All imported students will be assigned to the selected class.
              </p>
            </div>
          )}
          
          <div className="mt-4 border rounded-md overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h4 className="text-sm font-medium text-gray-700">Preview (first 5 students)</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr No</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {importedData.slice(0, 5).map((student, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.srNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.rollNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.gender}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {preparingToSubmit ? selectedClass || student.admissionClass : student.admissionClass}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!preparingToSubmit && (
              <div className="px-4 py-3 bg-gray-50 border-t flex justify-end">
                <button
                  onClick={() => setPreparingToSubmit(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 