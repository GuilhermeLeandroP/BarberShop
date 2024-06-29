import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Cadastro from './components/pages/Cadastro';
import SobreVoce from './components/pages/SobreVoce';
import Barbeiros from './components/pages/Barbeiros';
import Agendar from './components/pages/Agendar';
import SelectBarber from './components/pages/SelectBarber';

function App() {
    return (

            <Router>
      <AuthProvider>

                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/barbeiros" element={<Barbeiros />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/sobreVoce" element={<SobreVoce />} />
                    <Route path="/agendar" element={<Agendar />} />
                    <Route path="/selectBarber" element={<SelectBarber />} />
                </Routes>
                </AuthProvider>

            </Router>

    );
}

export default App;
