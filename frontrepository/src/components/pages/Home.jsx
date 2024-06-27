import React, { useEffect } from 'react';
import Navbar from '../layout/Navbar';
import styles from './Home.module.css';
import {getToken} from "../../Utils"

function Home() {
    useEffect(() => {
            const data = getToken();

            console.log(data);
        
    }, []);

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
