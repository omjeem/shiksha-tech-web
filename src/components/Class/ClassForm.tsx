'use client';

import { useState, useEffect } from 'react';
import { ClassData } from '@/utils/types/class';
import { ClassName_Enum } from '@/components/Student/StudentForm';
import Button from '@/components/Common/Button';
import { useSelector } from 'react-redux';
import { getAllCLassesName } from '@/redux/selector/classSelector';

interface ClassFormProps {
  onSubmit: (className: ClassName_Enum) => void;
  initialData: ClassData | null;
  isEdit?: boolean;
  schoolId: string;
}

export default function ClassForm({ onSubmit, initialData, isEdit = false, schoolId }: ClassFormProps) {
  const [className, setClassName] = useState<ClassName_Enum | ''>('');
  const allClassNames = useSelector(getAllCLassesName)


  useEffect(() => {
    if (initialData && isEdit) {
      setClassName(initialData.className);
    }
  }, [initialData, isEdit]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!className) {
      alert('Please select a class name');
      return;
    }

    onSubmit(className)
    // dispatch(addClass(className))

    // onSubmit();

    // Reset form if not editing
    if (!isEdit) {
      setClassName('');
    }
  };

  // Get a sorted array of class name enum values
  const classNameOptions = Object.values(ClassName_Enum).sort((a, b) => {
    // Custom sorting logic to handle class names correctly
    const order: Record<string, number> = {
      'PLAYGROUP': 1, 'NURSERY': 2, 'LKG': 3, 'UKG': 4,
      'ONE': 5, 'TWO': 6, 'THREE': 7, 'FOUR': 8, 'FIVE': 9,
      'SIX': 10, 'SEVEN': 11, 'EIGHT': 12, 'NINE': 13, 'TEN': 14,
      'ELEVEN': 15, 'TWELVE': 16
    };

    return (order[a] || 999) - (order[b] || 999);
  }).filter(cls => !allClassNames.includes(cls));

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        {isEdit ? 'Edit Class' : 'Add New Class'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-1">
            Class *
          </label>
          <select
            id="className"
            value={className}
            onChange={(e) => setClassName(e.target.value as ClassName_Enum)}
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Class</option>
            {classNameOptions.map((name) => (
              <option key={name} value={name}>
                {name.replace('_', ' ')}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Select the class name from the predefined options
          </p>
        </div>

        <div className="flex justify-end">
          {/* <Button
            type="submit"
            variant="primary"
          >
            {isEdit ? 'Update Class' : 'Add Class'}
          </Button> */}
          <Button
            type="submit"
            variant="primary"
          >
            Add Class
          </Button>
        </div>
      </form>
    </div>
  );
} 