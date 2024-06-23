import React from 'react';
import logo from '../../imagens/logo.png';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';

function Cadastro() {
    return (
        <div className={styles.container}>
            <img src={logo} alt="logo" className={styles.logo} />
            <input type="text" placeholder="Nome" className={styles['input-field']} />
            <input type="email" placeholder="E-mail" className={styles['input-field']} />
            <input type="text" placeholder="Estado" className={styles['input-field']} />
            <input type="text" placeholder="Cidade" className={styles['input-field']} />
            <input type="date" placeholder="Data de nascimento" className={styles['input-field']} />
            <input type="password" placeholder="Senha" className={styles['input-field']} />
            <button type="button" className={styles.btn}>Cadastrar</button>
            <Link to="/" className={styles.link}><p>Login</p></Link>
        </div>
    );
}

export default Cadastro;
