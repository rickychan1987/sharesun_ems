import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  CardContent,
  Tooltip,
  Chip,
  Alert,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Clear as ClearIcon, Info as InfoIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { employeeApi } from '../../api/employees';
import { positionApi } from '../../api/positions';
import { Employee, Position } from '../../types';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [positions, setPositions] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchEmployeeId, setSearchEmployeeId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: number | null }>({
    open: false,
    id: null,
  });
  const [detailDialog, setDetailDialog] = useState<{ open: boolean; employee: Employee | null }>({
    open: false,
    employee: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployeesAndPositions();
  }, []);

  const fetchEmployeesAndPositions = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Fetching employees and positions...');
      
      const [empData, posData] = await Promise.all([
        employeeApi.getAll(),
        positionApi.getAll(),
      ]);
      
      console.log('Raw employees data:', empData);
      console.log('Raw positions data:', posData);
      
      // Validate and set employees data
      if (Array.isArray(empData)) {
        setEmployees(empData);
        console.log('Employees set successfully:', empData.length, 'employees');
      } else {
        console.error('Invalid employees data format:', empData);
        setError('Invalid data received from server');
        setEmployees([]);
      }
      
      // Create a map of position id to title for quick lookup
      const positionMap: { [key: number]: string } = {};
      if (Array.isArray(posData)) {
        posData.forEach((pos: Position) => {
          positionMap[pos.id] = pos.title;
        });
        setPositions(positionMap);
        console.log('Position map created:', positionMap);
      } else {
        console.error('Invalid positions data format:', posData);
        setError('Failed to load positions');
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setError('Failed to load employees data');
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchEmployeeId && !searchName) {
      fetchEmployeesAndPositions();
      return;
    }

    try {
      setLoading(true);
      setError('');
      // Use the search endpoint properly
      const query = searchEmployeeId || searchName;
      const data = await employeeApi.search(query);
      
      if (Array.isArray(data)) {
        setEmployees(data);
      } else {
        setEmployees([]);
      }
    } catch (error) {
      console.error('Failed to search employees:', error);
      setError('Failed to search employees');
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchEmployeeId('');
    setSearchName('');
    fetchEmployeesAndPositions();
  };

  const handleDelete = async () => {
    if (deleteDialog.id) {
      try {
        await employeeApi.delete(deleteDialog.id);
        // Refresh the list after deletion
        await fetchEmployeesAndPositions();
        setDeleteDialog({ open: false, id: null });
      } catch (error) {
        console.error('Failed to delete employee:', error);
        setError('Failed to delete employee');
      }
    }
  };

  const handleViewDetails = (employee: Employee) => {
    setDetailDialog({ open: true, employee });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Refresh the list when navigating back to this page
  useEffect(() => {
    const handleFocus = () => {
      fetchEmployeesAndPositions();
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  if (loading && employees.length === 0) return <LoadingSpinner />;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Employees</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/employees/new')}
        >
          Add Employee
        </Button>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Search Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Search Employees
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
            <TextField
              label="Employee ID"
              value={searchEmployeeId}
              onChange={(e) => setSearchEmployeeId(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search by Employee ID"
              fullWidth
            />
            <TextField
              label="Employee Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search by Name"
              fullWidth
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={loading}
            >
              Search
            </Button>
            <Button
              variant="outlined"
              onClick={handleClearSearch}
              startIcon={<ClearIcon />}
              disabled={loading}
            >
              Clear
            </Button>
            <Button
              variant="text"
              onClick={fetchEmployeesAndPositions}
              disabled={loading}
            >
              Refresh
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Results Info */}
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        {loading ? 'Loading...' : `Showing ${employees.length} employee(s)`}
      </Typography>

      {/* Employee Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>Employee ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Position</strong></TableCell>
              <TableCell><strong>Department</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>ID Card</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <TableRow key={employee.id} hover>
                  <TableCell>
                    <Chip 
                      label={employee.employeeid}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>
                    <Box sx={{ 
                      display: 'inline-block',
                      px: 2,
                      py: 1,
                      backgroundColor: '#f3e5f5',
                      borderRadius: 1,
                      fontSize: '0.875rem',
                      fontWeight: 500
                    }}>
                      {positions[employee.positionid] || `Position #${employee.positionid}`}
                    </Box>
                  </TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.email || '-'}</TableCell>
                  <TableCell>
                    {employee.idcardnumber ? (
                      <Tooltip title={`${employee.idcardtype || 'ID'}: ${employee.idcardnumber}`}>
                        <Chip 
                          label={employee.idcardtype || 'ID'}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </Tooltip>
                    ) : (
                      <Typography variant="body2" color="textSecondary">-</Typography>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View Details">
                      <IconButton
                        color="info"
                        size="small"
                        onClick={() => handleViewDetails(employee)}
                      >
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => navigate(`/employees/edit/${employee.id}`)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => setDeleteDialog({ open: true, id: employee.id })}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Typography variant="body2" color="textSecondary">
                    {loading ? 'Loading employees...' : 'No employees found'}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Employee Details Dialog */}
      <Dialog open={detailDialog.open} onClose={() => setDetailDialog({ open: false, employee: null })} maxWidth="sm" fullWidth>
        <DialogTitle>Employee Details</DialogTitle>
        <DialogContent>
          {detailDialog.employee && (
            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Employee ID</Typography>
                <Typography variant="body1">{detailDialog.employee.employeeid}</Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Name</Typography>
                <Typography variant="body1">{detailDialog.employee.name}</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Position</Typography>
                <Typography variant="body1">{positions[detailDialog.employee.positionid] || `Position #${detailDialog.employee.positionid}`}</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Department</Typography>
                <Typography variant="body1">{detailDialog.employee.department}</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Email</Typography>
                <Typography variant="body1">{detailDialog.employee.email || '-'}</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Phone</Typography>
                <Typography variant="body1">{detailDialog.employee.phone || '-'}</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Date of Birth</Typography>
                <Typography variant="body1">{detailDialog.employee.dateofbirth || '-'}</Typography>
              </Box>

              <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Address</Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2">{detailDialog.employee.address || '-'}</Typography>
                <Typography variant="body2">
                  {[detailDialog.employee.city, detailDialog.employee.state, detailDialog.employee.postalcode, detailDialog.employee.country]
                    .filter(Boolean)
                    .join(', ') || '-'}
                </Typography>
              </Box>

              <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Identification</Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>{detailDialog.employee.idcardtype || 'No ID'}:</strong> {detailDialog.employee.idcardnumber || '-'}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailDialog({ open: false, employee: null })}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, id: null })}>
        <DialogTitle>Delete Employee</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this employee? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, id: null })}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}