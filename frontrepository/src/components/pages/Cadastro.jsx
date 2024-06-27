import React from 'react';
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
            senha: senha,
            type: "client",
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
                window.location.reload();
            } else {
                alert('Erro ao cadastrar usuário.');
            }
        }).catch(error => {
            alert('Erro na requisição:', error);
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <p className={styles.welcome}>Welcome</p>
                <p className={styles.logoName}>• Barber Shop •</p>
                <p className={styles.welcome}>Haircuts & Shaves</p>
                <input type="text" placeholder="Nome" className={styles.inputField} id='nome'/>
                <input type="email" placeholder="E-mail" className={styles.inputField} id='email'/>
                <input type="text" placeholder="Estado" className={styles.inputField} id='estado'/>
                <input type="text" placeholder="Cidade" className={styles.inputField} id='cidade'/>
                <input type="date" placeholder="Data de nascimento" className={styles.inputField} id='date'/>
                <input type="password" placeholder="Senha" className={styles.inputField} id='senha'/>
                <button type="button" className={styles.btn} onClick={CadastrarUsuario}>Cadastrar</button>
                <Link to="/" className={styles.link}><p>Login</p></Link>
            </div>
            <div className={styles.imageContainer}>
                <img src="https://barthausbarbearia.com.br/wp-content/uploads/2017/06/barthausbarbearia.com_.br-imagem-topo-2.jpg" alt="Background" className={styles.backgroundImage} />
            </div>
        </div>
    );
}

export default Cadastro;
