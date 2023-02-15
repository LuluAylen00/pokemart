import React from 'react';
import MainTop from './MainTop';
import MainBottom from './MainBottom';
import Divider from '@mui/material/Divider';
import '../styles/Main.css'

function Main() {

    return (
        <main>
            <section id="small-dashboard">
                <MainTop />
            </section>
            <Divider />
            <section id="medium-dashboard">
                <MainBottom />
            </section>
        </main>
    );
}

export default Main;
