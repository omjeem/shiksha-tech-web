
export enum SchoolStaffRole_Enum {
  SUPER_ADMIN = 'SUPER_ADMIN',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
  ACCOUNTANT = 'ACCOUNTANT',
  MANAGER = 'MANAGER',
  LIBRARIAN = 'LIBRARIAN',
  PEON = 'PEON',
  DRIVER = 'DRIVER',
  SECURITY = 'SECURITY',
  CLEANER = 'CLEANER',
  GATEKEEPER = 'GATEKEEPER',
  GARDENER = 'GARDENER',
  COOK = 'COOK',
  HELPER = 'HELPER',
  STUDENT = "STUDENT",
  PARENTS = "PARENTS"
}

export interface UserTokenData {
  schoolId: string | null;
  studentId: string | null;
  staffId: string | null;
  role: SchoolStaffRole_Enum | null;
  iat: number | null;
  exp: number | null;
}