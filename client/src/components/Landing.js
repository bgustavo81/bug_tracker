import React from 'react';
import Hero from './Hero';
import About from './About';


const Landing = () => {
    return (
        <div style={{ minHeight: '88vh'}}>
            <Hero />
            <About />
        </div>
    )
}

export default Landing;