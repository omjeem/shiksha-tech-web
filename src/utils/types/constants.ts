import { SchoolStaffRole_Enum } from "./user";

export const AUTH_TOKEN = 'shiksha_auth_token';

export interface DecodedToken {
    schoolId: string;
    email: string;
    role: SchoolStaffRole_Enum;
    userId: String
    iat: number;
    exp: number;
}