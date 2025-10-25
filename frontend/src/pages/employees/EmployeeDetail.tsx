import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Chip,
  Paper,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Edit as EditIcon } from '@mui/icons-material';
import { employeeApi } from '../../api/employees';
import { positionApi } from '../../api/positions';
import { Employee } from '../../types';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function EmployeeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [positionTitle, setPositionTitle] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployeeDetails();
  }, [id]);

  const fetchEmployeeDetails = async () => {
    try {
      setLoading(true);
      if (id) {
        const empData = await employeeApi.getById(parseInt(id));
        setEmployee(empData);
        
        if (empData.position_id) {
          const posData = await positionApi.getById(empData.position_id);
          setPositionTitle(posData.title);
        }
      }
    } catch (error) {
      console.error('Failed to fetch employee details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!employee) return <Typography>Employee not found</Typography>;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/employees')}
            variant="text"
          >
            Back
          </Button>
          <Typography variant="h4">Employee Details</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/employees/${id}/edit`)}
        >
          Edit
        </Button>
      </Box>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Column - Photo & Basic Info */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                src={employee.photo || '/default-avatar.png'}
                alt={employee.name}
                sx={{
                  width: 150,
                  height: 150,
                  mx: 'auto',
                  mb: 2,
                }}
              />
              <Typography variant="h5" gutterBottom>
                {employee.name}
              </Typography>
              <Chip
                label={employee.employee_id}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" color="textSecondary" display="block">
                {positionTitle}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Detailed Information */}
        <Grid item xs={12} sm={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="caption" color="textSecondary">
                      Employee ID
                    </Typography>
                    <Typography variant="body1">
                      {employee.employee_id}
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="caption" color="textSecondary">
                      Full Name
                    </Typography>
                    <Typography variant="body1">
                      {employee.name}
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="caption" color="textSecondary">
                      Email
                    </Typography>
                    <Typography variant="body1">
                      {employee.email}
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="caption" color="textSecondary">
                      Department
                    </Typography>
                    <Typography variant="body1">
                      {employee.department}
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="caption" color="textSecondary">
                      Position
                    </Typography>
                    <Typography variant="body1">
                      {positionTitle || 'N/A'}
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="caption" color="textSecondary">
                      ID Card Number
                    </Typography>
                    <Typography variant="body1">
                      {employee.id_card_number}
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="caption" color="textSecondary">
                      Phone
                    </Typography>
                    <Typography variant="body1">
                      {employee.phone || 'N/A'}
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="caption" color="textSecondary">
                      Address
                    </Typography>
                    <Typography variant="body1">
                      {employee.address || 'N/A'}
                    </Typography>
                  </Paper>
                </Grid>
                
                {/* <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="caption" color="textSecondary">
                      Hire Date
                    </Typography>
                    <Typography variant="body1">
                      {employee.hire_date ? new Date(employee.hire_date).toLocaleDateString() : 'N/A'}
                    </Typography>
                  </Paper>
                </Grid> */}
                
                {/* <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="caption" color="textSecondary">
                      Status
                    </Typography>
                    <Chip
                      label={employee.status || 'Active'}
                      color={employee.status === 'Active' ? 'success' : 'default'}
                      size="small"
                    />
                  </Paper>
                </Grid> */}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}