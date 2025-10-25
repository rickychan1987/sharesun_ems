import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Rating,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { reviewApi } from '../../api/reviews';

export default function ReviewForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: '',
    reviewer_id: '',
    score: 3,
    date: '',
    notes: '',
  });

  useEffect(() => {
    if (id) {
      fetchReview(Number(id));
    }
  }, [id]);

  const fetchReview = async (reviewId: number) => {
    try {
      const data = await reviewApi.getById(reviewId);
      setFormData({
        employee_id: String(data.employee_id),
        reviewer_id: String(data.reviewer_id),
        score: data.score,
        date: data.date,
        notes: data.notes || '',
      });
    } catch (error) {
      console.error('Failed to fetch review:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        employee_id: Number(formData.employee_id),
        reviewer_id: Number(formData.reviewer_id),
        score: formData.score,
        date: formData.date,
        notes: formData.notes || undefined,
      };

      if (id) {
        await reviewApi.update(Number(id), payload);
      } else {
        await reviewApi.create(payload);
      }
      navigate('/reviews');
    } catch (error) {
      console.error('Failed to save review:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Review' : 'Add Review'}
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
            label="Reviewer ID"
            type="number"
            value={formData.reviewer_id}
            onChange={(e) => setFormData({ ...formData, reviewer_id: e.target.value })}
            margin="normal"
            required
          />
          
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography component="legend">Score</Typography>
            <Rating
              value={formData.score}
              onChange={(event, newValue) => {
                setFormData({ ...formData, score: newValue || 0 });
              }}
              max={5}
              size="large"
            />
          </Box>

          <TextField
            fullWidth
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="Notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            margin="normal"
            multiline
            rows={4}
          />

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button variant="contained" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
            <Button variant="outlined" onClick={() => navigate('/reviews')}>
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
