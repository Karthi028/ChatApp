import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Loader } from "lucide-react"
import { Toaster } from 'react-hot-toast';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log(authUser);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  const routes = [
    {
      path: '/',
      element: <LandingPage />,
      children: [
        {
          path: '/',
          element: (
            authUser ? (
              <HomePage />
            ) : (
              <Navigate to="/login" replace />
            )
          ),
        },
        {
          path: '/signup',
          element: (
            !authUser ? (
              <SignUpPage />
            ) : (
              <Navigate to="/" replace />
            )
          ),
        },
        {
          path: '/login',
          element: (
            !authUser ? (
              <LoginPage />
            ) : (
              <Navigate to="/" replace />
            )
          ),
        },
        {
          path: '/settings',
          element: <SettingsPage />
        },
        {
          path: '/profile',
          element: (authUser ? (<ProfilePage />) : (<Navigate to='/login' replace />))
        }
      ]
    },
  ]
  const router = createBrowserRouter(routes, {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
  );

  return <div>
    <Toaster
      position='top-center'
      reverseOrder={false}
      toastOptions={{
        className: '',
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
        },
      }}
    />
    <RouterProvider
      future={{
        v7_startTransition: true,
      }}
      router={router}
    />
  </div>
}

export default App