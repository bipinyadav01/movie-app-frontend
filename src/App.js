import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Movies from './pages/Movies';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import EditMovie from './pages/EditMovie';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin/edit/:id"
  element={
    <ProtectedRoute adminOnly={true}>
      <EditMovie />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;


