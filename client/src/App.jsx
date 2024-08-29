import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/Root/Root';
import HomePage from './pages/Home/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import { UserProvider } from './store/UserContext';
import Logout from './pages/Auth/Logout';
import { SearchProvider } from './store/SearchContext';
import SearchPage from './pages/Search/Search';
import Hotel from './pages/Hotel/Hotel';
import Transaction from './pages/Transaction/Transaction';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'hotels/:id', element: <Hotel /> },
      { path: 'transactions', element: <Transaction /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'logout', element: <Logout /> },
    ],
  },
]);

function App() {
  return (
    <UserProvider>
      <SearchProvider>
        <RouterProvider router={router} />
      </SearchProvider>
    </UserProvider>
  );
}

export default App;
