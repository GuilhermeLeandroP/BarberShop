import React from 'react';
import logo from '../../imagens/logo3.png';
import styles from './Navbar.module.css';
import { getToken } from "../../Utils"
import { Link } from 'react-router-dom';

function Navbar() {
    const token = getToken();
    return (
        <div className={styles.navbar}>
            <div className={styles.logoContainer}>
                <p className={styles.welcome}>Welcome</p>
                <p className={styles.logoName}>• Barber Shop •</p>
                <p className={styles.welcome}>Haircuts & Shaves</p>
            </div>
            <div className={styles.navItems}>
                {/* <Link> <div className={styles.navItem}>Home</div></Link> */}
                <Link to="/selectBarber"><div className={styles.navItem}>Agendar</div></Link>
                <Link to="/barbeiros"><div className={styles.navItem}>Barbeiros</div></Link>
                <Link to="/sobreVoce"><div className={styles.navItem}>Sobre Você</div></Link>
            </div>
        </div>
    );
}

export default Navbar;
