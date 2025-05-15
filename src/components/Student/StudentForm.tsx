'use client';

import { getAllClasses } from '@/redux/selector/classSelector';
import { fetchAllClasses } from '@/redux/store/class/classThunk';
import apiServices from '@/services';
import { StudentData } from '@/utils/types/student';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// Class enum to match backend schema
export enum ClassName_Enum {
  PLAYGROUP = 'PLAYGROUP',
  NURSERY = 'NURSERY',
  LKG = 'LKG',
  UKG = 'UKG',
  ONE = 'ONE',
  TWO = 'TWO',
  THREE = 'THREE',
  FOUR = 'FOUR',
  FIVE = 'FIVE',
  SIX = 'SIX',
  SEVEN = 'SEVEN',
  EIGHT = 'EIGHT',
  NINE = 'NINE',
  TEN = 'TEN',
  ELEVEN = 'ELEVEN',
  TWELVE = 'TWELVE',
}

// Gender enum to match backend schema
export enum Gender_Enum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

interface StudentFormProps {
  onSubmit: (student: StudentData) => void;
  schoolId?: string; // Optional for now, would be required in production
}


const defaultStudent: StudentData = {
  srNo: 1,
  name: '',
  rollNo: 0,
  email: '',
  classId: "",
  sectionId: "",
  password: '',
  contactNumber: "",
  gender: Gender_Enum.MALE,
  dob: '',
  admissionClass: '',
  admissionSection: '',
  admissionDate: '',
  address: '',
  fatherName: '',
  fatherContact: '',
  fatherEmail: '',
  motherName: '',
  motherContact: '',
  motherEmail: '',
};

export default function StudentForm({ onSubmit, schoolId }: StudentFormProps) {
  const [student, setStudent] = useState<StudentData>(defaultStudent);
  const classesData = useSelector(getAllClasses).data
  const [sectionsList, setSectionList] = useState<any>([])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'rollNo') {
      setStudent(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setStudent(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(student);
  };


  useEffect(() => {
    const index = classesData.findIndex(cls => cls.id === student.classId)
    if (index !== -1) {
      const sectionData: any = classesData[index]?.sections || []
      setSectionList(sectionData)
    }
  }, [student.classId])
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700 mb-1">
            Roll Number *
          </label>
          <input
            type="number"
            id="rollNo"
            name="rollNo"
            value={student.rollNo || ''}
            onChange={handleChange}
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password (Optional)
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={student.password}
            onChange={handleChange}
            placeholder="Auto-generated if left blank"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <p className="text-xs text-gray-500 mt-1">If left blank, a password will be automatically generated.</p>
        </div>

        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth *
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={student.dob}
            onChange={handleChange}
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
            Gender *
          </label>
          <select
            id="gender"
            name="gender"
            value={student.gender}
            onChange={handleChange}
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Gender</option>
            <option value={Gender_Enum.MALE}>Male</option>
            <option value={Gender_Enum.FEMALE}>Female</option>
            <option value={Gender_Enum.OTHER}>Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="admissionClass" className="block text-sm font-medium text-gray-700 mb-1">
            Class *
          </label>
          <select
            id="classId"
            name="classId"
            value={student.classId}
            onChange={handleChange}
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Class</option>
            {classesData.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.className.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="admissionSection" className="block text-sm font-medium text-gray-700 mb-1">
            Section *
          </label>
          <select
            id="sectionId"
            name="sectionId"
            value={student.sectionId}
            onChange={handleChange}
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Section</option>
            {sectionsList.map((section: any) => (
              <option key={section.id} value={section.id}>
                {section.sectionName.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="admissionDate" className="block text-sm font-medium text-gray-700 mb-1">
            Admission Date *
          </label>
          <input
            type="date"
            id="admissionDate"
            name="admissionDate"
            value={student.admissionDate}
            onChange={handleChange}
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={student.address}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="col-span-2 border-t pt-4 mt-2">
          <h3 className="text-md font-medium text-gray-700 mb-3">Parent/Guardian Information</h3>
        </div>

        <div>
          <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700 mb-1">
            Father's Name
          </label>
          <input
            type="text"
            id="fatherName"
            name="fatherName"
            value={student.fatherName}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="fatherContact" className="block text-sm font-medium text-gray-700 mb-1">
            Father's Contact
          </label>
          <input
            type="tel"
            id="fatherContact"
            name="fatherContact"
            value={student.fatherContact}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="fatherEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Father's Email
          </label>
          <input
            type="email"
            id="fatherEmail"
            name="fatherEmail"
            value={student.fatherEmail}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="motherName" className="block text-sm font-medium text-gray-700 mb-1">
            Mother's Name
          </label>
          <input
            type="text"
            id="motherName"
            name="motherName"
            value={student.motherName}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="motherContact" className="block text-sm font-medium text-gray-700 mb-1">
            Mother's Contact
          </label>
          <input
            type="tel"
            id="motherContact"
            name="motherContact"
            value={student.motherContact}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="motherEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Mother's Email
          </label>
          <input
            type="email"
            id="motherEmail"
            name="motherEmail"
            value={student.motherEmail}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Student
        </button>
      </div>
    </form>
  );
} 