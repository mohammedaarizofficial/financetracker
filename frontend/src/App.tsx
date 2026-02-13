import './App.css'
import Login from '../src/pages/Login.tsx';
import {Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard.tsx';
import { useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute.tsx';
import Expenses from './pages/Expenses.tsx';

function App() {
  const [username, setUsername]= useState<string>('');
  const [password, setPassword]=useState<string>('');
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Login Username={username} Password={password} setUsername={setUsername} setPassword={setPassword} />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>} />
          <Route path='/expenses' element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          } />
      </Routes>
    </>
  )
}

export default App
