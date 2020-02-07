import React from 'react';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import "../styles/HeroStyles.css"


const Hero = () => {
    return (
        <div className='HeroContainer'>       
                <div className='HeroTextContainer'>
                    <h1 className="HeroTitle">Let's track that bug.</h1>
                <Link 
                    to='/signin'
                    style={{ textDecoration: 'none'}}
                    className='HeroLink'
                >
                    <Button
                        variant='contained'
                        color='secondary'
                        size="large"
                    >
                        SignUp
                    </Button>
                </Link>
                </div>
        </div>

    )
}

export default Hero;