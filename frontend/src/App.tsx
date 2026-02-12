import './App.css'
import Login from '../src/pages/Login.tsx';
import {Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard.tsx';
import { useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute.tsx';

function App() {
  const [username, setUsername]= useState<string>('');
  const [password, setPassword]=useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem('token')
  );

  return (
    <>
      <Routes>
        <Route path='/' element={<Login Username={username} Password={password} setUsername={setUsername} setPassword={setPassword} setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path='/dashboard' element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard setIsAuthenticated={setIsAuthenticated}/>
          </ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
