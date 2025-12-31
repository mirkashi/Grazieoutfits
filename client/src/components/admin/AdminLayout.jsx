import { Outlet } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

function AdminLayout() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Panel</Typography>
      <Outlet />
    </Container>
  );
}

export default AdminLayout;
