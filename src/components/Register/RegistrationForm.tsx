"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { schoolSchema, SchoolFormData, SchoolBoard } from '../../utils/schema/school';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import { BACKEND_URL } from '@/utils';
import Navbar from '../Landing/Navbar';
import { useRouter } from 'next/navigation';

const boardOptions = [
  { value: SchoolBoard.CBSE, label: 'CBSE' },
  { value: SchoolBoard.ICSE, label: 'ICSE' },
  { value: SchoolBoard.STATE, label: 'State Board' },
  { value: SchoolBoard.IB, label: 'International Baccalaureate (IB)' },
  { value: SchoolBoard.OTHER, label: 'Other' },
];

const RegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtherBoard, setShowOtherBoard] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const navigate = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<SchoolFormData>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      totalStudents: 0,
      totalTeachers: 0,
      totalClasses: 0,
    },
  });

  const selectedBoard = watch('board');

  // Watch for board changes to show/hide the "Other" field
  useEffect(() => {
    if (selectedBoard === SchoolBoard.OTHER) {
      setShowOtherBoard(true);
    } else {
      setShowOtherBoard(false);
    }
  }, [selectedBoard]);

  const onSubmit = async (data: SchoolFormData) => {
    try {
      setIsSubmitting(true);

      // Remove confirmPassword before sending to API
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...submissionData } = data;

      // For static export, simulate API behavior
      console.log('Submission data:', submissionData);

      // Simulate API delay
      const response = await axios.post(`${BACKEND_URL}/school`, submissionData, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      console.log('API response:', response.data);
      // await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success message
      toast.success('Registration submitted successfully!');
      setRegistrationComplete(true);
      reset();

    } catch (error) {
      console.error("Error while creating school:", error);
      toast.error("School registration failed! Please try again with different credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (registrationComplete) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">

        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Complete!</h2>
        <p className="text-gray-600 mb-6">
          We have registered your school details. Once the verification is complete,
          you can access all features. We will notify you via email when your account is ready.
        </p>
        <button
          onClick={() => setRegistrationComplete(false)}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Register Another School
        </button>
        <button
          onClick={()=>{
            navigate.push("/login")
          }}
          className="bg-blue-600 ml-4 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Login As Admin
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Toaster position="top-right" />

      <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">School Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="School Name"
            type="text"
            {...register('schoolName')}
            error={errors.schoolName}
            required
          />
          <FormInput
            label="Website"
            type="url"
            placeholder="https://www.example.com"
            {...register('websiteLink')}
            error={errors.websiteLink}
            required
          />
          <FormInput
            label="Contact Number"
            type="tel"
            {...register('contactNumber')}
            error={errors.contactNumber}
            required
          />
          <FormInput
            label="Contact Email"
            type="email"
            {...register('contactEmail')}
            error={errors.contactEmail}
            required
          />
          <div className="md:col-span-2">
            <FormInput
              label="School Address"
              type="text"
              {...register('address')}
              error={errors.address}
              required
            />
          </div>
          <FormSelect
            label="Board"
            {...register('board')}
            options={boardOptions}
            error={errors.board}
            required
            onChange={(e) => {
              setShowOtherBoard(e.target.value === SchoolBoard.OTHER);
            }}
          />
          {showOtherBoard && (
            <FormInput
              label="Specify Board"
              type="text"
              {...register('otherBoard')}
              error={errors.otherBoard}
              required={selectedBoard === SchoolBoard.OTHER}
            />
          )}
        </div>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg mb-6 border border-purple-100">
        <h2 className="text-xl font-semibold text-purple-800 mb-2">School Statistics (Optional)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            label="Total Students"
            type="number"
            min="0"
            {...register('totalStudents', { valueAsNumber: true })}
            error={errors.totalStudents}
          />
          <FormInput
            label="Total Teachers"
            type="number"
            min="0"
            {...register('totalTeachers', { valueAsNumber: true })}
            error={errors.totalTeachers}
          />
          <FormInput
            label="Total Classes"
            type="number"
            min="0"
            {...register('totalClasses', { valueAsNumber: true })}
            error={errors.totalClasses}
          />
        </div>
      </div>

      <div className="bg-amber-50 p-4 rounded-lg mb-6 border border-amber-100">
        <h2 className="text-xl font-semibold text-amber-800 mb-2">Super Administrator Details</h2>
        <p className="text-gray-600 mb-4 text-sm">These credentials will be used to access the admin portal.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Admin Name"
            type="text"
            {...register('superAdminName')}
            error={errors.superAdminName}
            required
          />
          <FormInput
            label="Admin Email"
            type="email"
            {...register('superAdminEmail')}
            error={errors.superAdminEmail}
            required
          />
          <FormInput
            label="Admin Contact"
            type="tel"
            {...register('superAdminContact')}
            error={errors.superAdminContact}
            required
          />
          <FormInput
            label="Password"
            type="password"
            {...register('superAdminPassword')}
            error={errors.superAdminPassword}
            required
          />
          <FormInput
            label="Confirm Password"
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword}
            required
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Register School'
          )}
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300 py-3 px-8 rounded-lg font-semibold transition-all duration-300"
        >
          Reset Form
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm; 