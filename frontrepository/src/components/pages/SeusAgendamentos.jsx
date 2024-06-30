import Navbar from "../layout/Navbar";
import styles from "./SeusAgendamentos.module.css";
import React, { useEffect, useState } from 'react';
import { getToken } from "../../Utils";

export default function SeusAgendamentos() {
    const tokenData = getToken();
    const userId = tokenData.id;
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/agendamentos/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tokenData.token}`, // Adicione o token de autorização se necessário
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setAgendamentos(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the agendamentos!", error);
                setError(error);
                setLoading(false);
            });
    }, [userId, tokenData.token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <h3>Seus Agendamentos</h3>
                <div className={styles.list}>
                    {agendamentos.length > 0 ? (
                        agendamentos.map(agendamento => (
                            <div key={agendamento.id} className={styles.agendamento}>
                                <p>Data: {new Date(agendamento.data).toLocaleDateString()}</p>
                                <p>Hora: {agendamento.hora}</p>
                                <p>Barbeiro: {agendamento.barbeiros.nome}</p>
                            </div>
                        ))
                    ) : (
                        <p>Você não tem agendamentos.</p>
                    )}
                </div>
            </div>
        </>
    );
}
