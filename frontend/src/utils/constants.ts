export const API_BASE_URL = 'http://localhost:8000';
export const API_TIMEOUT = 30000; // 30 seconds

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  EMPLOYEES: '/employees',
  DEPARTMENTS: '/departments',
  ATTENDANCE: '/attendance',
  LEAVES: '/leaves',
  PAYROLL: '/payroll',
  REVIEWS: '/reviews',
  ANNOUNCEMENTS: '/announcements',
};

export const LEAVE_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
