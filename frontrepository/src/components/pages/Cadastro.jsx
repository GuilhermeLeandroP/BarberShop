import React from 'react';
import logo from '../../imagens/logo3.png';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';

function Cadastro() {

    function CadastrarUsuario() {
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const estado = document.getElementById('estado').value;
        const cidade = document.getElementById('cidade').value;
        const dataNascimento = document.getElementById('date').value;
        const senha = document.getElementById('senha').value;

        const usuario = {
            nome: nome,
            email: email,
            estado: estado,
            cidade: cidade,
            dataNascimento: dataNascimento,
            senha: senha
        };

        fetch("http://localhost:8080/usuario", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario)
        }).then(response => {
            if (response.ok) {
                alert('Usuário cadastrado com sucesso!');
            } else {
                alert('Erro ao cadastrar usuário.');
            }
        }).catch(error => {
            alert('Erro na requisição:', error);
        });
    }

    return (
        <div className={styles.container}>
            <img src={logo} alt="logo" className={styles.logo} />
            <input type="text" placeholder="Nome" className={styles['input-field']} id='nome'/>
            <input type="email" placeholder="E-mail" className={styles['input-field']} id='email'/>
            <input type="text" placeholder="Estado" className={styles['input-field']} id='estado'/>
            <input type="text" placeholder="Cidade" className={styles['input-field']} id='cidade'/>
            <input type="date" placeholder="Data de nascimento" className={styles['input-field']} id='date'/>
            <input type="password" placeholder="Senha" className={styles['input-field']} id='senha'/>
            <button type="button" className={styles.btn} onClick={CadastrarUsuario}>Cadastrar</button>
            <Link to="/" className={styles.link}><p>Login</p></Link>
        </div>
    );
}

export default Cadastro;
