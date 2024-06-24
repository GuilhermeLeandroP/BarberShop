import React from 'react';
import Navbar from '../layout/Navbar';
import styles from './Home.module.css';

function Home() {
    return (
        <div>
            <Navbar />
            <div className={styles.content}>
                <p>Home Content</p>
            </div>
        </div>
    );
}

export default Home;
