'use client';

import { useState } from 'react';
import { ClassData } from '@/utils/types/class';

interface ClassListProps {
  classes: ClassData[];
  onEdit: (classItem: ClassData) => void;
  onDelete: (classId: string) => void;
  onDeleteSection: (classId: string, sectionId: string) => void;
}

export default function ClassList({ classes, onEdit, onDelete, onDeleteSection }: ClassListProps) {
  const [expandedClasses, setExpandedClasses] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const toggleExpand = (classId: string) => {
    setExpandedClasses(prev => ({
      ...prev,
      [classId]: !prev[classId]
    }));
  };

  const handleDeleteClass = (classId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this class? This will also delete all associated sections.')) {
      onDelete(classId);
    }
  };

  const handleDeleteSection = (classId: string, sectionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this section?')) {
      onDeleteSection(classId, sectionId);
    }
  };

  const filteredClasses = classes.filter(classItem =>
    classItem.className.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search classes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {filteredClasses?.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? 'No classes matching your search' : 'No classes available'}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredClasses.map((classItem) => (
            <div key={classItem.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div
                className="bg-gray-50 px-4 py-3 flex items-center justify-between cursor-pointer"
                onClick={() => toggleExpand(classItem.id)}
              >
                <div className="flex items-center space-x-2">
                  {expandedClasses[classItem.id] ? (
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  <h3 className="text-md font-medium text-gray-800">
                    Class {classItem.className}
                  </h3>
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                    {classItem.sections?.length} section{classItem.totalSection !== 1 ? 's' : ''}
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {classItem.totalStudent} student{classItem.totalStudent !== 1 ? 's' : ''}
                  </span>
                </div>
                {/* <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(classItem);
                    }}
                    className="p-1 text-blue-600 hover:text-blue-800"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => handleDeleteClass(classItem.id, e)}
                    className="p-1 text-red-600 hover:text-red-800"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div> */}
              </div>

              {expandedClasses[classItem.id] && (
                <div className="px-4 py-3 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Sections:</h4>
                  {classItem.sections?.length === 0 ? (
                    <p className="text-sm text-gray-500">No sections available for this class</p>
                  ) : (
                    <div className="space-y-2">
                      {classItem.sections.map((section) => (
                        <div key={section.id} className="bg-gray-50 p-3 rounded flex justify-between items-center">
                          <div>
                            <span className="font-medium">Section {section.sectionName}</span>
                            <span className="ml-3 text-sm text-gray-500">{section.totalStudent} student{section.totalStudent !== 1 ? 's' : ''}</span>
                          </div>
                          {/* <button
                            onClick={(e) => handleDeleteSection(classItem.id, section.id, e)}
                            className="p-1 text-red-600 hover:text-red-800"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button> */}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 