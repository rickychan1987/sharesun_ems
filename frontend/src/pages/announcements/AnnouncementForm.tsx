import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { announcementApi } from '../../api/announcements';

export default function AnnouncementForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    department_id: '',
  });

  useEffect(() => {
    if (id) {
      fetchAnnouncement(Number(id));
    }
  }, [id]);

  const fetchAnnouncement = async (announcementId: number) => {
    try {
      const data = await announcementApi.getById(announcementId);
      setFormData({
        title: data.title,
        message: data.message,
        department_id: data.department_id ? String(data.department_id) : '',
      });
    } catch (error) {
      console.error('Failed to fetch announcement:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        message: formData.message,
        department_id: formData.department_id ? Number(formData.department_id) : undefined,
      };

      if (id) {
        await announcementApi.update(Number(id), payload);
      } else {
        await announcementApi.create(payload);
      }
      navigate('/announcements');
    } catch (error) {
      console.error('Failed to save announcement:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Announcement' : 'Add Announcement'}
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            margin="normal"
            multiline
            rows={6}
            required
          />
          <TextField
            fullWidth
            label="Department ID (Optional)"
            type="number"
            value={formData.department_id}
            onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
            margin="normal"
            helperText="Leave empty for company-wide announcement"
          />

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button variant="contained" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
            <Button variant="outlined" onClick={() => navigate('/announcements')}>
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
