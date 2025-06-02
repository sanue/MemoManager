import { Container, CssBaseline, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box component="main">
          <Outlet />
        </Box>
      </Container>
    </>
  );
}
