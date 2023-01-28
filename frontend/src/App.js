
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import HomPage from './pages/HomPage';
import Login from './pages/Login';
import Register from './pages/Register';
import AddSectors from './pages/AddSectors';
import UserSectorInfo from './pages/UserSectorInfo';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={
          <ProtectedRoutes>
            <HomPage />
          </ProtectedRoutes>} />
        <Route path="/:id" element={
          <ProtectedRoutes>
            <HomPage />
          </ProtectedRoutes>} />
        <Route path="/login" element={< Login />} />
        <Route path="/add-sectors" element={< AddSectors />} />
        <Route path="/add-sectors/:id" element={< AddSectors />} />
        <Route path="/user-sector-list" element={< UserSectorInfo />} />
        <Route path="/register" element={< Register />} />
      </Routes>
    </>
  );
}
export function ProtectedRoutes(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}
export default App;
