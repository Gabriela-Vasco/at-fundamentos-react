import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import SnackbarProvider from 'react-simple-snackbar';
import Home from './pages/Home';
import HotelDetails from './pages/HotelDetails';
import HotelFavorites from './pages/HotelFavorites';
import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/hotel-details/:id',
    element: <HotelDetails />,
  },
  {
    path: '/hotel-favorites',
    element: <HotelFavorites />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackbarProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </SnackbarProvider>
  </StrictMode>,
);
