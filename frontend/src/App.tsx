import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Auth components
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Layout
import Layout from './components/layout/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import PositionList from './pages/positions/PositionList';
import PositionForm from './pages/positions/PositionForm';
import EmployeeList from './pages/employees/EmployeeList';
import EmployeeForm from './pages/employees/EmployeeForm';
import DepartmentList from './pages/departments/DepartmentList';
import DepartmentForm from './pages/departments/DepartmentForm';
import AttendanceList from './pages/attendance/AttendanceList';
import AttendanceForm from './pages/attendance/AttendanceForm';
import LeaveList from './pages/leaves/LeaveList';
import LeaveForm from './pages/leaves/LeaveForm';
import PayrollList from './pages/payroll/PayrollList';
import PayrollForm from './pages/payroll/PayrollForm';
import ReviewList from './pages/reviews/ReviewList';
import ReviewForm from './pages/reviews/ReviewForm';
import AnnouncementList from './pages/announcements/AnnouncementList';
import AnnouncementForm from './pages/announcements/AnnouncementForm';
import EmployeeDetail from './pages/employees/EmployeeDetail';

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Position Routes */}
            <Route
              path="/positions"
              element={
                <ProtectedRoute>
                  <Layout>
                    <PositionList />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/positions/new"
              element={
                <ProtectedRoute>
                  <Layout>
                    <PositionForm />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/positions/edit/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <PositionForm />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Employee Routes */}
            <Route
              path="/employees"
              element={
                <ProtectedRoute>
                  <Layout>
                    <EmployeeList />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/employees/new"
              element={
                <ProtectedRoute>
                  <Layout>
                    <EmployeeForm />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/employees/edit/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <EmployeeForm />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<EmployeeList />} />

            {/* Department Routes */}
            <Route
              path="/departments"
              element={
                <ProtectedRoute>
                  <Layout>
                    <DepartmentList />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/departments/new"
              element={
                <ProtectedRoute>
                  <Layout>
                    <DepartmentForm />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/departments/edit/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <DepartmentForm />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Attendance Routes */}
            <Route
              path="/attendance"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AttendanceList />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendance/new"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AttendanceForm />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendance/edit/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AttendanceForm />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Leave Routes */}
            <Route
              path="/leaves"
              element={
                <ProtectedRoute>
                  <Layout>
                    <LeaveList />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaves/new"
              element={
                <ProtectedRoute>
                  <Layout>
                    <LeaveForm />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaves/edit/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <LeaveForm />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Payroll Routes */}
            <Route
              path="/payroll"
              element={
                <ProtectedRoute>
                  <Layout>
                    <PayrollList />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/payroll/new"
              element={
                <ProtectedRoute>
                  <Layout>
                    <PayrollForm />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/payroll/edit/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <PayrollForm />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Review Routes */}
            <Route
              path="/reviews"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ReviewList />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/reviews/new"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ReviewForm />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/reviews/edit/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ReviewForm />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Announcement Routes */}
            <Route
              path="/announcements"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AnnouncementList />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/announcements/new"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AnnouncementForm />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/announcements/edit/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AnnouncementForm />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Catch all - redirect to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
