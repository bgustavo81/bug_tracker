import React from 'react';
import './footer.css';

const Footer = () => (
        <div className='pt_footer section_padding'>
            <div className='pt_footer-heading'>
                <h1 className='gradient_text'> Lets track that bug</h1>
            </div>
            <div className='pt_footer-links'>
                <div className='pt_footer-links_div'>
                    <p>Order Tracking</p>
                    <p>Who we are</p>
                    <p>Pro Program</p>
                </div>
                <div className='pt_footer-links_div'>
                    <p>Terms & Conditions</p>
                    <p>Privacy Policy</p>
                    <p>Contact</p>
                </div>
                <div className='pt_footer-links_div'>
                    <h4>Get in touch</h4>
                    <p>Careers</p>
                    <p>Customer Service</p>
                </div>
            </div>

            <div className='pt_footer-copyright'>
                <p>@2023 Bug Tracker</p>
            </div>
        </div>
);

export default Footer;