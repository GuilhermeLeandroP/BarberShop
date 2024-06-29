import React, { useEffect, useState } from 'react';
import Navbar from "../layout/Navbar";
import styles from './SobreVoce.module.css';
import { getToken } from '../../Utils';

export default function SobreVoce() {
    const [usuario, setUsuario] = useState({
        nome: '',
        email: '',
        estado: '',
        cidade: '',
        dataNascimento: '',
        senha: ''
    });

    const dataToken = getToken();
    const id = dataToken.id;

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await fetch(`http://localhost:8080/usuario/${id}`, {});
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsuario({
                    foto: data.foto,
                    nome: data.nome,
                    email: data.email,
                    estado: data.estado,
                    cidade: data.cidade,
                    dataNascimento: data.dataNascimento,
                    senha: '' // Normalmente, você não obteria a senha do usuário da API por questões de segurança
                });
            } catch (error) {
                console.error('Erro ao buscar o usuário:', error);
            }
        };

        if (usuario.nome === '' && usuario.email === '' && usuario.estado === '' && usuario.cidade === '' && usuario.dataNascimento === '') {
            fetchUsuario();
        }
    }, [id, dataToken, usuario]);

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8080/usuario/atualizar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.text();
            console.log('Usuário atualizado com sucesso:', responseData);
            window.location.reload();
        } catch (error) {
            console.error('Erro ao atualizar o usuário:', error);
        }
    };
    console.log(usuario)

    function handleImageUpload(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                setUsuario({ ...usuario, foto: event.target.result });
            };
            reader.readAsDataURL(file);
        }
    }

    const foto = usuario.foto ? usuario.foto : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGLRjJm4TSyn1eCHBKnVt9UNJEkd1XoHSIRQ&s"
    return (
        <>
            <Navbar />
            <div className={styles.formContainer}>
                <div className={styles.imageContainer}>
                    <img
                        src={foto}
                        alt="Foto do Usuário"
                        className={styles.userImage}
                    />
                    <label htmlFor="fileInput" className={styles.uploadButton}></label>
                    <input
                        type="file"
                        accept="image/*"
                        className={styles.fileInput}
                        id="fileInput"
                        onChange={handleImageUpload}
                    />
                </div>
                <input
                    type="text"
                    placeholder="Nome"
                    className={styles.inputField}
                    id='nome'
                    value={usuario.nome}
                    onChange={e => setUsuario({ ...usuario, nome: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    className={styles.inputField}
                    id='email'
                    value={usuario.email}
                    onChange={e => setUsuario({ ...usuario, email: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Estado"
                    className={styles.inputField}
                    id='estado'
                    value={usuario.estado}
                    onChange={e => setUsuario({ ...usuario, estado: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Cidade"
                    className={styles.inputField}
                    id='cidade'
                    value={usuario.cidade}
                    onChange={e => setUsuario({ ...usuario, cidade: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Data de nascimento"
                    className={styles.inputField}
                    id='date'
                    value={usuario.dataNascimento}
                    onChange={e => setUsuario({ ...usuario, dataNascimento: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Nova senha"
                    className={styles.inputField}
                    id='senha'
                    value={usuario.senha}
                    onChange={e => setUsuario({ ...usuario, senha: e.target.value })}
                />
                <button type="button" className={styles.btn} onClick={handleUpdate}>
                    Alterar informações
                </button>
            </div>
        </>
    );
}
