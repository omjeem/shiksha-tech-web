import { z } from 'zod';

export enum SchoolBoard {
  CBSE = 'CBSE',
  ICSE = 'ICSE',
  STATE = 'STATE',
  IB = 'IB',
  OTHER = 'OTHER'
}

export const schoolSchema = z.object({
  schoolName: z.string().min(3, 'School name must be at least 3 characters').max(255),
  address: z.string().min(5, 'Address must be at least 5 characters').max(255),
  websiteLink: z.string().url('Please enter a valid URL').max(255),
  contactNumber: z.string().min(10, 'Contact number must be at least 10 digits').max(15),
  contactEmail: z.string().email('Please enter a valid email').max(255),
  superAdminName: z.string().min(3, 'Admin name must be at least 3 characters').max(255),
  superAdminPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(255)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  confirmPassword: z.string(),
  superAdminEmail: z.string().email('Please enter a valid email').max(255),
  superAdminContact: z.string().min(10, 'Contact number must be at least 10 digits').max(15),
  totalStudents: z.number().int().min(0).default(0),
  totalTeachers: z.number().int().min(0).default(0),
  totalClasses: z.number().int().min(0).default(0),
  board: z.nativeEnum(SchoolBoard),
  otherBoard: z.string().max(255).optional(),
}).refine(data => data.superAdminPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
}).refine(
  data => !(data.board === SchoolBoard.OTHER && !data.otherBoard),
  {
    message: "Please specify the board name",
    path: ["otherBoard"]
  }
);

export type SchoolFormData = z.infer<typeof schoolSchema>; 