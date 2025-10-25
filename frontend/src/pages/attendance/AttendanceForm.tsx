import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { attendanceApi } from '../../api/attendance';

export default function AttendanceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: '',
    check_in: '',
    check_out: '',
  });

  useEffect(() => {
    if (id) {
      fetchAttendance(Number(id));
    }
  }, [id]);

  const fetchAttendance = async (attId: number) => {
    try {
      const data = await attendanceApi.getById(attId);
      setFormData({
        employee_id: String(data.employee_id),
        check_in: new Date(data.check_in).toISOString().slice(0, 16),
        check_out: data.check_out ? new Date(data.check_out).toISOString().slice(0, 16) : '',
      });
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        employee_id: Number(formData.employee_id),
        check_in: new Date(formData.check_in).toISOString(),
        check_out: formData.check_out ? new Date(formData.check_out).toISOString() : undefined,
      };

      if (id) {
        await attendanceApi.update(Number(id), payload);
      } else {
        await attendanceApi.create(payload);
      }
      navigate('/attendance');
    } catch (error) {
      console.error('Failed to save attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Attendance' : 'Add Attendance'}
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Employee ID"
            type="number"
            value={formData.employee_id}
            onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Check In"
            type="datetime-local"
            value={formData.check_in}
            onChange={(e) => setFormData({ ...formData, check_in: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="Check Out"
            type="datetime-local"
            value={formData.check_out}
            onChange={(e) => setFormData({ ...formData, check_out: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button variant="contained" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
            <Button variant="outlined" onClick={() => navigate('/attendance')}>
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
