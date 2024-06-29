import React, { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import styles from "./Barbeiros.module.css";
import { getToken } from "../../Utils";

export default function Barbeiros() {
    const [barbeiros, setBarbeiros] = useState([]);
    const [selectedBarbeiro, setSelectedBarbeiro] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const tokenData = getToken();
    const isAdmin = tokenData.type === "Admin" ? true : false;

    useEffect(() => {
        fetch("http://localhost:8080/barbeiros", {
            method: 'GET'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setBarbeiros(data))
            .catch(error => console.error("There was an error fetching the barbeiros!", error));
    }, []);

    const handleEdit = (barbeiro) => {
        setSelectedBarbeiro(barbeiro);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        try {
            fetch(`http://localhost:8080/barbeiros/${id}`, {
                method: 'DELETE'
            })
            .then(() => {
                setBarbeiros(prevBarbeiros => prevBarbeiros.filter(barbeiro => barbeiro.id !== id));
            });
        } catch (error) {
            alert('Erro na requisição:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedBarbeiro(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        const method = selectedBarbeiro.id ? 'PUT' : 'POST';
        const url = selectedBarbeiro.id ? `http://localhost:8080/barbeiros/${selectedBarbeiro.id}` : `http://localhost:8080/barbeiros`;
        
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedBarbeiro)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (method === 'POST') {
                setBarbeiros(prevBarbeiros => [...prevBarbeiros, data]);
            } else {
                setBarbeiros(prevBarbeiros => prevBarbeiros.map(barbeiro => 
                    barbeiro.id === data.id ? data : barbeiro
                ));
            }
            setIsModalOpen(false);
            setSelectedBarbeiro(null);
        })
        .catch(error => console.error("There was an error updating the barbeiro!", error));
    };

    const handleAdd = () => {
        setSelectedBarbeiro({ nome: '', email: '', anosExp: 0, foto: '' });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBarbeiro(null);
    };

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <button className={styles.incluir} onClick={handleAdd}>+</button>
                <h1 className={styles.title}>Lista de Barbeiros</h1>
                <div className={styles.list}>
                    {barbeiros.map(barbeiro => (
                        <div key={barbeiro.id} className={styles.barbeiroCard}>
                            {isAdmin && <div className={styles.actions}>
                                <button className={styles.editButton} onClick={() => handleEdit(barbeiro)}>
                                    <span>&#9998;</span>
                                </button>
                                <button className={styles.deleteButton} onClick={() => handleDelete(barbeiro.id)}>
                                    <span>&#128465;</span>
                                </button>
                            </div>}
                            <div className={styles.barbeiroFoto}>
                                <img src={barbeiro.foto} alt={barbeiro.nome} />
                            </div>
                            <div className={styles.barbeiroInfo}>
                                <div className={styles.barbeiroNome}>{barbeiro.nome}</div>
                                <div className={styles.barbeiroEmail}>{barbeiro.email}</div>
                                <div className={styles.barbeiroExp}>{barbeiro.anosExp} anos de experiência</div>
                            </div>
                        </div>
                    ))}
                </div>
                {isModalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <button className={styles.closeButton} onClick={closeModal}>
                                &times;
                            </button>
                            <div className={styles.modalBody}>
                                <h2>{selectedBarbeiro && selectedBarbeiro.id ? 'Editar Barbeiro' : 'Incluir Barbeiro'}</h2>
                                {selectedBarbeiro && (
                                    <div>
                                        <div className={styles.modalField}>
                                            <label>Nome:</label>
                                            <input
                                                type="text"
                                                name="nome"
                                                value={selectedBarbeiro.nome}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className={styles.modalField}>
                                            <label>Email:</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={selectedBarbeiro.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className={styles.modalField}>
                                            <label>Anos de Experiência:</label>
                                            <input
                                                type="number"
                                                name="anosExp"
                                                value={selectedBarbeiro.anosExp}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className={styles.modalField}>
                                            <label>Foto URL:</label>
                                            <input
                                                type="text"
                                                name="foto"
                                                value={selectedBarbeiro.foto}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className={styles.modalField}>
                                            <button onClick={handleSave}>Salvar</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
