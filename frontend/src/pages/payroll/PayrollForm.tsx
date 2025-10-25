import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { payrollApi } from '../../api/payroll';

export default function PayrollForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: '',
    base_salary: '',
    bonus: '',
    deductions: '',
    net_pay: '',
    pay_date: '',
  });

  useEffect(() => {
    if (id) {
      fetchPayroll(Number(id));
    }
  }, [id]);

  useEffect(() => {
    // Auto-calculate net pay
    const baseSalary = parseFloat(formData.base_salary) || 0;
    const bonus = parseFloat(formData.bonus) || 0;
    const deductions = parseFloat(formData.deductions) || 0;
    const netPay = baseSalary + bonus - deductions;
    
    setFormData(prev => ({ ...prev, net_pay: netPay.toString() }));
  }, [formData.base_salary, formData.bonus, formData.deductions]);

  const fetchPayroll = async (payrollId: number) => {
    try {
      const data = await payrollApi.getById(payrollId);
      setFormData({
        employee_id: String(data.employee_id),
        base_salary: String(data.base_salary),
        bonus: String(data.bonus),
        deductions: String(data.deductions),
        net_pay: String(data.net_pay),
        pay_date: data.pay_date,
      });
    } catch (error) {
      console.error('Failed to fetch payroll:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        employee_id: Number(formData.employee_id),
        base_salary: Number(formData.base_salary),
        bonus: Number(formData.bonus),
        deductions: Number(formData.deductions),
        net_pay: Number(formData.net_pay),
        pay_date: formData.pay_date,
      };

      if (id) {
        await payrollApi.update(Number(id), payload);
      } else {
        await payrollApi.create(payload);
      }
      navigate('/payroll');
    } catch (error) {
      console.error('Failed to save payroll:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Payroll' : 'Add Payroll'}
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
            label="Base Salary"
            type="number"
            value={formData.base_salary}
            onChange={(e) => setFormData({ ...formData, base_salary: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Bonus"
            type="number"
            value={formData.bonus}
            onChange={(e) => setFormData({ ...formData, bonus: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Deductions"
            type="number"
            value={formData.deductions}
            onChange={(e) => setFormData({ ...formData, deductions: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Net Pay"
            type="number"
            value={formData.net_pay}
            margin="normal"
            InputProps={{ readOnly: true }}
            helperText="Auto-calculated: Base Salary + Bonus - Deductions"
          />
          <TextField
            fullWidth
            label="Pay Date"
            type="date"
            value={formData.pay_date}
            onChange={(e) => setFormData({ ...formData, pay_date: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button variant="contained" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
            <Button variant="outlined" onClick={() => navigate('/payroll')}>
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
