import { ClassName_Enum } from "@/components/Student/StudentForm";

export interface ClassData {
  id: string;
  serial: number;
  schoolId: string;
  className: ClassName_Enum;
  totalSection: number;
  totalStudent: number;
  createdAt: string;
  updatedAt: string;
  sections: SectionData[];
}

export interface SectionData {
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