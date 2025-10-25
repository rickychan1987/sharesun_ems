import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { leaveApi } from '../../api/leaves';

export default function LeaveForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: '',
    start_date: '',
    end_date: '',
    reason: '',
    status: 'pending',
  });

  useEffect(() => {
    if (id) {
      fetchLeave(Number(id));
    }
  }, [id]);

  const fetchLeave = async (leaveId: number) => {
    try {
      const data = await leaveApi.getById(leaveId);
      setFormData({
        employee_id: String(data.employee_id),
        start_date: data.start_date,
        end_date: data.end_date,
        reason: data.reason || '',
        status: data.status,
      });
    } catch (error) {
      console.error('Failed to fetch leave:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        employee_id: Number(formData.employee_id),
        start_date: formData.start_date,
        end_date: formData.end_date,
        reason: formData.reason || undefined,
        status: formData.status,
      };

      if (id) {
        await leaveApi.update(Number(id), payload);
      } else {
        await leaveApi.create(payload);
      }
      navigate('/leaves');
    } catch (error) {
      console.error('Failed to save leave:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Leave' : 'Add Leave'}
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
            label="Start Date"
            type="date"
            value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="End Date"
            type="date"
            value={formData.end_date}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="Reason"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            margin="normal"
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </TextField>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button variant="contained" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
            <Button variant="outlined" onClick={() => navigate('/leaves')}>
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
