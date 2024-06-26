import { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import styles from "./SelectBarber.module.css";
import { format, addDays } from 'date-fns';

export default function Barber() {
    const [barbeiros, setBarbeiros] = useState([]);
    const [selectedBarbeiro, setSelectedBarbeiro] = useState('');
    const [showCalendar, setShowCalendar] = useState(false); // Estado para controlar a exibição do calendário
    const [selectedDate, setSelectedDate] = useState(null); // Estado para armazenar a data selecionada
    const [selectedTime, setSelectedTime] = useState(''); // Estado para armazenar o horário selecionado
    const [availableTimes, setAvailableTimes] = useState([]); // Horários disponíveis

    useEffect(() => {
        getBarbers();
    }, []);

    function getBarbers() {
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
    }

    const handleChangeBarber = (e) => {
        setSelectedBarbeiro(e.target.value);
        setShowCalendar(true); // Mostrar o calendário quando um barbeiro for selecionado
        setSelectedDate(null); // Limpar a data selecionada ao mudar de barbeiro
        setSelectedTime(''); // Limpar o horário selecionado ao mudar de barbeiro
        fetchAvailableTimes(e.target.value, null); // Buscar horários disponíveis para o barbeiro selecionado
    };

    const handleChangeDate = (date) => {
        setSelectedDate(date);
        setSelectedTime(''); // Limpar o horário selecionado ao mudar de data
        fetchAvailableTimes(selectedBarbeiro, date); // Buscar horários disponíveis para o barbeiro e data selecionados
    };

    const handleTimeSelection = (time) => {
        setSelectedTime(time);
    };

    // Função para obter os próximos 30 dias a partir de hoje
    const getNext30Days = () => {
        const today = new Date();
        const days = [];
        for (let i = 0; i < 30; i++) {
            const nextDay = addDays(today, i);
            days.push(nextDay);
        }
        return days;
    };

    // Função para formatar a data no formato desejado
    const formatDate = (date) => {
        return format(date, 'dd/MM/yyyy');
    };

    // Função para buscar os horários disponíveis para o barbeiro e data selecionados
    const fetchAvailableTimes = (barbeiroId, date) => {
        // Implemente a lógica para buscar os horários disponíveis no backend aqui
        // Por enquanto, vamos apenas simular que todos os horários estão disponíveis
        const times = [
            '08:00', '09:00', '10:00', '11:00',
            '12:00', '13:00', '14:00', '15:00',
            '16:00', '17:00'
        ];
        setAvailableTimes(times);
    };

    // Função para enviar o agendamento para o backend
    const handleSchedule = () => {
        if (!selectedBarbeiro || !selectedDate || !selectedTime) {
            alert('Por favor, selecione um barbeiro, data e horário para agendar.');
            return;
        }

        // Aqui você deve enviar os dados para o backend (barbeiro, data e horário selecionados)
        // Exemplo de como enviar usando fetch:
        fetch('http://localhost:8080/agendamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                barbeiroId: selectedBarbeiro,
                data: selectedDate,
                horario: selectedTime
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Agendamento realizado com sucesso!');
            // Aqui você pode limpar os estados ou realizar outras ações após o agendamento
        })
        .catch(error => {
            console.error('Houve um erro ao agendar:', error);
            alert('Houve um erro ao agendar. Por favor, tente novamente mais tarde.');
        });
    };

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <select className={styles.selectBarber} value={selectedBarbeiro} onChange={handleChangeBarber}>
                    <option value="">Selecione um barbeiro</option>
                    {barbeiros.map(barbeiro => (
                        <option key={barbeiro.id} value={barbeiro.id}>
                            {barbeiro.nome}
                        </option>
                    ))}
                </select>
                {showCalendar && (
                    <div className={styles.calendarContainer}>
                        <h3>Selecione uma data</h3>
                        <div className={styles.calendar}>
                            {getNext30Days().map((day, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleChangeDate(day)}
                                    className={selectedDate && day.getTime() === selectedDate.getTime() ? styles.selectedDate : styles.calendarDay}
                                >
                                    {formatDate(day)}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {selectedDate && (
                    <div className={styles.timeContainer}>
                        <h3>Selecione um horário</h3>
                        <div className={styles.times}>
                            {availableTimes.map((time, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleTimeSelection(time)}
                                    className={selectedTime === time ? styles.selectedTime : styles.timeButton}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                        <button onClick={handleSchedule} className={styles.scheduleButton}>Agendar</button>
                    </div>
                )}
            </div>
        </>
    );
}
