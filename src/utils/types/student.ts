import { Gender_Enum } from "@/components/Student/StudentForm";

export interface StudentData {
    srNo: number;
    name: string;
    rollNo: number;
    email: string;
    password: string;
    classId: string;
    sectionId : string;
    gender: Gender_Enum;
    dob: string;
    admissionClass: string;
    admissionSection: string;
    admissionDate: string;
    address: string;
    fatherName: string;
    fatherContact: string;
    fatherEmail: string;
    motherName: string;
    motherContact: string;
    motherEmail: string;
    contactNumber: string
  }