// Status constants
export enum Status {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

// Form types
export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
