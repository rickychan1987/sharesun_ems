import apiClient from './axios';

export interface Employee {
  id: number;
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
  photo_url?: string;
}

export interface EmployeeCreate {
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

export interface EmployeeUpdate {
  name?: string;
  positionid?: number;
  department?: string;
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

export const employeeApi = {
  // Create employee with optional photo
  create: async (data: EmployeeCreate, photoFile?: File): Promise<Employee> => {
    const formData = new FormData();
    formData.append('employee_data', JSON.stringify(data));
    
    if (photoFile) {
      formData.append('photo', photoFile);
    }
    
    const response = await apiClient.post<Employee>('/employees/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000,
    });
    return response.data;
  },

  // Update employee with optional photo
  update: async (id: number, data: EmployeeUpdate, photoFile?: File): Promise<Employee> => {
    const formData = new FormData();
    formData.append('employee_data', JSON.stringify(data));
    
    if (photoFile) {
      formData.append('photo', photoFile);
    }
    
    console.log('Updating employee:', id, data); // Debug log
    
    const response = await apiClient.put<Employee>(`/employees/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000,
    });
    return response.data;
  },

  // Get employee by ID
  getById: async (id: number): Promise<Employee> => {
    const response = await apiClient.get<Employee>(`/employees/${id}`);
    return response.data;
  },

  // Get all employees
  getAll: async (skip: number = 0, limit: number = 100): Promise<Employee[]> => {
    const response = await apiClient.get<Employee[]>('/employees/', {
      params: { skip, limit }
    });
    return response.data;
  },

  // Delete employee
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/employees/${id}`);
  },

  // Search employees
  search: async (query: string): Promise<Employee[]> => {
    const response = await apiClient.get<Employee[]>('/employees/search/', {
      params: { q: query }
    });
    return response.data;
  }
};
