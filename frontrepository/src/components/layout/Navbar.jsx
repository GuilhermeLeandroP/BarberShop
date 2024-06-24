import React from 'react';
import logo from '../../imagens/logo3.png';
import styles from './Navbar.module.css';

function Navbar() {
    return (
        <div className={styles.navbar}>
            <img src={logo} alt="logo" className={styles.logo}/>
            <div className={styles.navItems}>
                <div className={styles.navItem}>Home</div>
                <div className={styles.navItem}>Agendar</div>
                <div className={styles.navItem}>Barbeiros</div>
                <div className={styles.navItem}>Suas informações</div>
            </div>
        </div>
    );
}

export default Navbar;
