// Position Types
export interface Position {
  id: number;
  title: string;
  description?: string;
}

export interface PositionCreate extends Omit<Position, 'id'> {}
export interface PositionUpdate extends Partial<Omit<Position, 'id'>> {}

// Employee Types
export interface Employee {
  id: number;
  employeeid: string;  // Changed from employee_id
  name: string;
  positionid: number;  // Changed from position_id
  department: string;
  email?: string;
  phone?: string;

  // New fields
  address?: string;
  city?: string;
  state?: string;
  postalcode?: string;  // Changed from postal_code
  country?: string;
  
  idcardtype?: string;  // Changed from id_card_type
  idcardnumber?: string;  // Changed from id_card_number
  dateofbirth?: string;  // Changed from date_of_birth
  photo?: string; // ADD THIS LINE - Photo file path/URL
  createdAt?: string;
  updatedAt?: string;
}

export interface EmployeeFormData {
  employeeid: string;
  name: string;
  positionid: string;
  department: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postalcode?: string;
  country?: string;
  idcardtype?: string;
  idcardnumber?: string;
  dateofbirth?: string;
}

export interface EmployeePayload {
  employeeid: string;
  name: string;
  positionid: number;
  department: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postalcode?: string;
  country?: string;
  idcardtype?: string;
  idcardnumber?: string;
  dateofbirth?: string;
}

export interface EmployeeCreate extends Omit<Employee, 'id'> {}
export interface EmployeeUpdate extends Partial<Omit<Employee, 'id'>> {}



// Attendance Types
export interface Attendance {
  id: number;
  employee_name: string;
  check_in: string;
  check_out?: string;
}

export interface AttendanceCreate extends Omit<Attendance, 'id'> {}
export interface AttendanceUpdate extends Partial<Omit<Attendance, 'id'>> {}

// Leave Types
export interface Leave {
  id: number;
  employee_name: string;
  start_date: string;
  end_date: string;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface LeaveCreate extends Omit<Leave, 'id'> {}
export interface LeaveUpdate extends Partial<Omit<Leave, 'id'>> {}

// Payroll Types
export interface Payroll {
  id: number;
  employee_name: string;
  base_salary: number;
  bonus: number;
  deductions: number;
  net_pay: number;
  pay_date: string;
}

export interface PayrollCreate extends Omit<Payroll, 'id'> {}
export interface PayrollUpdate extends Partial<Omit<Payroll, 'id'>> {}

// Review Types
export interface Review {
  id: number;
  employee_name: string;
  reviewer_name: string;
  score: number;
  date: string;
  notes?: string;
}

export interface ReviewCreate extends Omit<Review, 'id'> {}
export interface ReviewUpdate extends Partial<Omit<Review, 'id'>> {}

// Announcement Types
export interface Announcement {
  id: number;
  title: string;
  message: string;
  created_at: string;
  department?: string;
}

export interface AnnouncementCreate extends Omit<Announcement, 'id' | 'created_at'> {}
export interface AnnouncementUpdate extends Partial<Omit<Announcement, 'id' | 'created_at'>> {}

// Other Types...
export interface Department {
  id: number;
  name: string;
  description?: string;
}

export interface DepartmentCreate extends Omit<Department, 'id'> {}
export interface DepartmentUpdate extends Partial<Omit<Department, 'id'>> {}

export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: 'admin' | 'manager' | 'employee';
  is_active: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface TokenData {
  username?: string;
}
