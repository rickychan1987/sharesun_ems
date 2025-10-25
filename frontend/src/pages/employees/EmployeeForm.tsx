import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  MenuItem,
  Grid,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { employeeApi } from '../../api/employees';
import { departmentApi } from '../../api/departments';
import { positionApi } from '../../api/positions';
import { Position } from '../../types';
import PhotoUpload from '../../components/employees/PhotoUpload';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ID_CARD_TYPES = ['Passport', 'National ID', 'Driver License', 'Visa', 'Other'];

export default function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [departments, setDepartments] = useState<string[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    employeeid: '',
    name: '',
    positionid: '',
    department: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalcode: '',
    country: '',
    idcardtype: '',
    idcardnumber: '',
    dateofbirth: '',
  });

  useEffect(() => {
    fetchDepartmentsAndPositions();
    if (id) {
      fetchEmployee(Number(id));
    }
  }, [id]);

  const fetchDepartmentsAndPositions = async () => {
    try {
      const [deptData, posData] = await Promise.all([
        departmentApi.getAll(),
        positionApi.getAll(),
      ]);

      const deptNames = deptData.map((dept: any) => dept.name);
      setDepartments(deptNames);
      setPositions(posData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setError('Failed to load departments and positions');
    }
  };

  const fetchEmployee = async (employeeId: number) => {
    try {
      setLoading(true);
      const data = await employeeApi.getById(employeeId);
      console.log('Fetched employee data:', data); // Debug log
      
      setFormData({
        employeeid: data.employeeid || '',
        name: data.name || '',
        positionid: data.positionid ? String(data.positionid) : '',
        department: data.department || '',
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || '',
        city: data.city || '',
        state: data.state || '',
        postalcode: data.postalcode || '',
        country: data.country || '',
        idcardtype: data.idcardtype || '',
        idcardnumber: data.idcardnumber || '',
        dateofbirth: data.dateofbirth || '',
      });
    } catch (error) {
      console.error('Failed to fetch employee:', error);
      setError('Failed to load employee data');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoSelect = (file: File | null) => {
    setPhotoFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Submitting form data:', formData); // Debug log

      // Validate required fields
      if (!formData.employeeid || !formData.name || !formData.positionid || !formData.department) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      const payload = {
        employeeid: formData.employeeid,
        name: formData.name,
        positionid: Number(formData.positionid),
        department: formData.department,
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        address: formData.address || undefined,
        city: formData.city || undefined,
        state: formData.state || undefined,
        postalcode: formData.postalcode || undefined,
        country: formData.country || undefined,
        idcardtype: formData.idcardtype || undefined,
        idcardnumber: formData.idcardnumber || undefined,
        dateofbirth: formData.dateofbirth || undefined,
      };

      console.log('Sending payload:', payload); // Debug log

      if (id) {
        // UPDATE employee
        await employeeApi.update(Number(id), payload, photoFile || undefined);
      } else {
        // CREATE employee
        await employeeApi.create(payload, photoFile || undefined);
      }

      navigate('/employees');
    } catch (err: any) {
      console.error('Failed to save employee:', err);
      const errorMessage = err.response?.data?.detail || 
                          err.response?.data?.message || 
                          err.message || 
                          'Failed to save employee';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) return <LoadingSpinner />;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Employee' : 'Add Employee'}
      </Typography>

      <Paper sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* LEFT COLUMN - PHOTO UPLOAD */}
            <Grid item xs={12} sm={4}>
              <PhotoUpload
                currentPhoto={id ? undefined : undefined}
                onPhotoSelect={handlePhotoSelect}
                isLoading={loading}
                employeeName={formData.name || 'Employee'}
              />
            </Grid>

            {/* RIGHT COLUMN - FORM FIELDS */}
            <Grid item xs={12} sm={8}>
              {/* Basic Information Section */}
              <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
                Basic Information
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Employee ID"
                    value={formData.employeeid}
                    onChange={(e) =>
                      setFormData({ ...formData, employeeid: e.target.value })
                    }
                    placeholder="e.g. EMP-001"
                    required
                    disabled={!!id} // Employee ID should not be editable
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name *"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    error={!formData.name}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Position *"
                    value={formData.positionid}
                    onChange={(e) =>
                      setFormData({ ...formData, positionid: e.target.value })
                    }
                    required
                    error={!formData.positionid}
                  >
                    <MenuItem value="">Select a position</MenuItem>
                    {positions.map((pos) => (
                      <MenuItem key={pos.id} value={pos.id}>
                        {pos.title}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Department *"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    required
                    error={!formData.department}
                  >
                    <MenuItem value="">Select a department</MenuItem>
                    {departments.map((dept) => (
                      <MenuItem key={dept} value={dept}>
                        {dept}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    type="date"
                    value={formData.dateofbirth}
                    onChange={(e) =>
                      setFormData({ ...formData, dateofbirth: e.target.value })
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>

              {/* Address Information Section */}
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Address Information
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Street Address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Enter street address"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="State/Province"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Postal Code"
                    value={formData.postalcode}
                    onChange={(e) =>
                      setFormData({ ...formData, postalcode: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                  />
                </Grid>
              </Grid>

              {/* ID Document Section */}
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Identification Information
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="ID Card Type"
                    value={formData.idcardtype}
                    onChange={(e) =>
                      setFormData({ ...formData, idcardtype: e.target.value })
                    }
                  >
                    <MenuItem value="">Select ID type</MenuItem>
                    {ID_CARD_TYPES.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="ID Card Number"
                    value={formData.idcardnumber}
                    onChange={(e) =>
                      setFormData({ ...formData, idcardnumber: e.target.value })
                    }
                    placeholder="e.g. 123456789"
                  />
                </Grid>
              </Grid>

              {/* Action Buttons */}
              <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  sx={{ minWidth: 120 }}
                >
                  {loading ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      Saving...
                    </>
                  ) : (
                    'Save Employee'
                  )}
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => navigate('/employees')}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}