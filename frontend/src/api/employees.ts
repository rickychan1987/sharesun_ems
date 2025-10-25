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

// Pagination response interface
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface EmployeeSearchParams {
  page?: number;
  size?: number;
  search?: string;
}

export const employeeApi = {
  // Get all employees - extract items from paginated response
  getAll: async (): Promise<Employee[]> => {
    const response = await apiClient.get<PaginatedResponse<Employee>>('/employees/');
    // Return the items array from the paginated response
    return response.data.items;
  },

  // Get employee by ID
  getById: async (id: number): Promise<Employee> => {
    const response = await apiClient.get<Employee>(`/employees/${id}`);
    return response.data;
  },

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
    
    const response = await apiClient.put<Employee>(`/employees/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000,
    });
    return response.data;
  },

  // Delete employee
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/employees/${id}`);
  },

  // Search employees - extract items from paginated response
  search: async (query: string): Promise<Employee[]> => {
    const response = await apiClient.get<PaginatedResponse<Employee>>('/employees/search/', {
      params: { q: query }
    });
    // Return the items array from the paginated response
    return response.data.items;
  }
};