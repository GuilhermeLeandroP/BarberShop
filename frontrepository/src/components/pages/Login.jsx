import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/usuario/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });

            if (response.ok) {
                const token = await response.text();
                localStorage.setItem('token', token);
                navigate('/selectBarber');
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (error) {
            setError('Erro ao fazer login, tente novamente.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <p className={styles.welcome}>Welcome</p>
                <p className={styles.logoName}>• Barber Shop •</p>
                <p className={styles.welcome}>Haircuts & Shaves</p>
                <input 
                    type="text" 
                    placeholder="E-mail" 
                    className={styles.inputField} 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="senha" 
                    className={styles.inputField} 
                    value={senha} 
                    onChange={(e) => setSenha(e.target.value)} 
                />
                <button 
                    type="button" 
                    className={styles.btn} 
                    onClick={handleLogin}
                >
                    Login
                </button>
                {error && <p className={styles.error}>{error}</p>}
                <Link to="/Cadastro" className={styles.link}><p>Criar uma conta</p></Link>
            </div>
            <div className={styles.imageContainer}>
                <img src="https://barthausbarbearia.com.br/wp-content/uploads/2017/06/barthausbarbearia.com_.br-imagem-topo-2.jpg" alt="Background" className={styles.backgroundImage} />
            </div>
        </div>
    );
}

export default Login;
