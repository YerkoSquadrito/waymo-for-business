import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { DeviceFrame } from './components/DeviceFrame';
import Landing from './routes/landing';
import AppLayout from './routes/app/layout';
import Home from './routes/app/home';
import Book from './routes/app/book';
import Account from './routes/app/account';
import Vehicles from './routes/app/vehicles';
import BusinessHub from './routes/app/business';
import Connect from './routes/app/business/connect';
import Calendar from './routes/app/business/calendar';
import Commute from './routes/app/business/commute';
import Confirm from './routes/app/business/confirm';

function RootLayout() {
  return (
    <DeviceFrame>
      <Outlet />
    </DeviceFrame>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Landing /> },
      {
        path: '/app',
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="/app/home" replace /> },
          { path: 'home', element: <Home /> },
          { path: 'book', element: <Book /> },
          { path: 'vehicles', element: <Vehicles /> },
          { path: 'account', element: <Account /> },
          {
            path: 'business',
            children: [
              { index: true, element: <BusinessHub /> },
              { path: 'connect', element: <Connect /> },
              { path: 'calendar', element: <Calendar /> },
              { path: 'commute', element: <Commute /> },
              { path: 'confirm', element: <Confirm /> },
            ],
          },
        ],
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
