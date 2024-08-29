import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import HomePage from './pages/Home';
import User from './pages/User';
import Hotel from './pages/Hotel';
import Room from './pages/Room';
import AddHotel from './components/AddHotel';
import AddRoom from './components/AddRoom';
import LatestTransaction from './pages/Transaction';
import PrivateRoute from './context/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Logout from './Auth/Logout';
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'users', element: <User /> },
      { path: 'hotels', element: <Hotel /> },
      { path: 'hotels/add-new', element: <AddHotel /> },
      { path: 'rooms', element: <Room /> },
      { path: 'rooms/add-new', element: <AddRoom /> },
      { path: 'transactions', element: <LatestTransaction /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/logout', element: <Logout /> },
  { path: '/register', element: <Register /> },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
