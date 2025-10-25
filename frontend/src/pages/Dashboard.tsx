import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { employeeApi } from '../api/employees';
import { departmentApi } from '../api/departments';
import { leaveApi } from '../api/leaves';
import { announcementApi } from '../api/announcements';

export default function Dashboard() {
  const [stats, setStats] = useState({
    employees: 0,
    departments: 0,
    pendingLeaves: 0,
    announcements: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [employees, departments, leaves, announcements] = await Promise.all([
          employeeApi.getAll(),
          departmentApi.getAll(),
          leaveApi.getAll(),
          announcementApi.getAll(),
        ]);

        setStats({
          employees: employees.length,
          departments: departments.length,
          pendingLeaves: leaves.filter(l => l.status === 'pending').length,
          announcements: announcements.length,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Tổng Số Nhân Viên - 总员工数',
      value: stats.employees,
      icon: <PeopleIcon sx={{ fontSize: 20 }} />,
      color: '#1976d2',
    },
    {
      title: 'Bộ Phận - 部门',
      value: stats.departments,
      icon: <BusinessIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
    },
    {
      title: 'Nghỉ Phép Chờ Duyệt - 待批准假期',
      value: stats.pendingLeaves,
      icon: <BeachAccessIcon sx={{ fontSize: 40 }} />,
      color: '#ed6c02',
    },
    {
      title: 'Thông Báo - 公告',
      value: stats.announcements,
      icon: <AnnouncementIcon sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="h4" component="div">
                      {card.value}
                    </Typography>
                  </Box>
                  <Box sx={{ color: card.color }}>
                    {card.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
