import { ClassName_Enum } from "@/components/Student/StudentForm";

export interface Class {
  id: string;
  serial: number;
  schoolId: string;
  className: ClassName_Enum;
  totalSection: number;
  totalStudent: number;
  createdAt: string;
  updatedAt: string;
  sections: Section[];
}

export interface Section {
  id: string;
  serial: number;
  schoolId: string;
  classId: string;
  sectionName: string;
  totalStudent: number;
  classMonitorId?: string; // Optional as per schema
  classTeacherId?: string; // Optional as per schema
  createdAt: string;
  updatedAt: string;
} 