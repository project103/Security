import React, { useEffect, useState } from 'react';
import AdminDashboard from './components/admin/adminDashboard/AdminDashboard';
import { LoginContext } from './components/context/LoginContext';
import SignIn from './components/signIn/SignIn';
import SignUp from './components/signup/SignUp';
import UserFrame from './components/userFrame/UserFrame';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem('user-details') !== '') {
      setUser(JSON.parse(localStorage.getItem('user-details')));
    }
  }, []);

  return (
    <>
      <Router>
        <LoginContext.Provider value={{ user, setUser }}>
          {user !== null ? (
            (user.role === 'ADMIN' && <AdminDashboard />) || (user.role === 'USER' && <UserFrame />)
          ) : (<>
            <Routes>
              <Route path="/" exact element={<Navigate to="/sign-in" />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          </>
          )}
        </LoginContext.Provider>
      </Router>
    </>
  )
}

export default App;