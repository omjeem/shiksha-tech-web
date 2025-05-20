import { ClassName_Enum } from "@/components/Student/StudentForm";

export interface ClassData {
  id: string;
  className: ClassName_Enum;
  totalStudent: number;
  createdAt: string;
  updatedAt: string;
  sections: SectionData[];
}

export const ClassDataCustomOrder: ClassName_Enum[] = [
  ClassName_Enum.PLAYGROUP,
  ClassName_Enum.NURSERY,
  ClassName_Enum.LKG,
  ClassName_Enum.UKG,
  ClassName_Enum.ONE,
  ClassName_Enum.TWO,
  ClassName_Enum.THREE,
  ClassName_Enum.FOUR,
  ClassName_Enum.FIVE,
  ClassName_Enum.SIX,
  ClassName_Enum.SEVEN,
  ClassName_Enum.EIGHT,
  ClassName_Enum.NINE,
  ClassName_Enum.TEN,
  ClassName_Enum.ELEVEN,
  ClassName_Enum.TWELVE,
];

export interface SectionData {
  id: string;
  sectionName: string;
  classId: string;
  totalStudent: number;
  classMonitorId?: string; // Optional as per schema
  classTeacherId?: string; // Optional as per schema
  createdAt?: string;
  updatedAt?: string;
} 