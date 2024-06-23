import React from 'react';
import logo from '../../imagens/logo.png';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className={styles.container}>
            <img src={logo} alt="logo" className={styles.logo} />
            <input type="text" placeholder="nome" className={styles['input-field']} />
            <input type="password" placeholder="senha" className={styles['input-field']} />
            <Link to="/Home">
                <button type="button" className={styles.btn}>Login</button>
            </Link>
            <Link to="/Cadastro" className={styles.link}><p>Criar uma conta</p></Link>
        </div>
    );
}

export default Login;
