import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Cadastro from './components/pages/Cadastro';

function App() {
    return (

            <Router>
      <AuthProvider>

                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                </Routes>
                </AuthProvider>

            </Router>

    );
}

export default App;
