import React from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <p className={styles.welcome}>Welcome</p>
                <p className={styles.logoName}>• Barber Shop •</p>
                <p className={styles.welcome}>Haircuts & Shaves</p>
                <input type="text" placeholder="nome" className={styles.inputField} />
                <input type="password" placeholder="senha" className={styles.inputField} />
                <Link to="/Home">
                <button type="button" className={styles.btn}>Login</button>
                </Link>
                <Link to="/Cadastro" className={styles.link}><p>Criar uma conta</p></Link>
            </div>
            <div className={styles.imageContainer}>
                <img src="https://barthausbarbearia.com.br/wp-content/uploads/2017/06/barthausbarbearia.com_.br-imagem-topo-2.jpg" alt="Background" className={styles.backgroundImage} />
            </div>
        </div>
    );
}

export default Login;
