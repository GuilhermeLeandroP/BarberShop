import { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import styles from "./SelectBarber.module.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, addDays } from 'date-fns';
import { getToken } from "../../Utils";

export default function SelectBarber() {
    const [barbeiros, setBarbeiros] = useState([]);
    const [selectedBarbeiro, setSelectedBarbeiro] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const tokenData = getToken();
    const userId = tokenData.id;
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
        setShowCalendar(true);
        setSelectedDate(null);
        setSelectedTime('');
        fetchAvailableTimes(e.target.value, null);
    };

    const handleChangeDate = (date) => {
        setSelectedDate(date);
        setSelectedTime('');
        fetchAvailableTimes(selectedBarbeiro, date);
    };

    const fetchAvailableTimes = (barbeiroId, date) => {
        let times = [
            '07:00', '08:00', '09:00', '10:00', '11:00',
            '12:00', '13:00', '14:00', '15:00',
            '16:00', '17:00', '18:00'
        ];

        if (barbeiroId && date) {
            fetch(`http://localhost:8080/agendamentos?barbeiroId=${barbeiroId}&data=${formatDate(date)}`, {
                method: 'GET'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const agendamentos = data;
                times = times.filter(time => !agendamentos.some(agendamento => agendamento.horario === time));
                setAvailableTimes(times);
            })
            .catch(error => console.error("Houve um erro ao buscar os agendamentos:", error));
        } else {
            setAvailableTimes(times);
        }
    };

    const formatDate = (date) => {
        return format(date, 'yyyy-MM-dd');
    };

    const handleSchedule = () => {
        if (!selectedBarbeiro || !selectedDate || !selectedTime) {
            alert('Por favor, selecione um barbeiro, data e horário para agendar.');
            return;
        }

        if (!availableTimes.includes(selectedTime)) {
            alert('O horário selecionado não está mais disponível. Por favor, escolha outro horário.');
            return;
        }

        fetch('http://localhost:8080/agendamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario: {
                    id: `${userId}`
                },
                barbeiros: {
                    id: selectedBarbeiro
                },
                data: formatDate(selectedDate),
                hora: selectedTime
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else if(response.CONFLIT) {
                alert("O barbeiro já tem um agendamento nesse mesmo horário e data");
                window.location.reload();
            }
            return response.json();
        })
        .then(data => {
            alert('Agendamento realizado com sucesso!');
            setSelectedBarbeiro('');
            setShowCalendar(false);
            setSelectedDate(null);
            setSelectedTime('');
            setAvailableTimes([]);
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
                <h3>Selecione um barbeiro</h3>
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
                        <Calendar onChange={handleChangeDate} value={selectedDate} minDate={new Date()} />
                    </div>
                )}
                {selectedDate && (
                    <div className={styles.timeContainer}>
                        <h3>Selecione um horário</h3>
                        <div className={styles.times}>
                            {availableTimes.map((time, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedTime(time)}
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
