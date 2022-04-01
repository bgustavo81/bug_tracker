import React from 'react';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import BugReportIcon from '@material-ui/icons/BugReport';
import CodeIcon from '@material-ui/icons/Code';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import '../styles/AboutStyles.css';

const About = () => {
    return (
        <div className="AboutContainer">
            <h2 className="AboutTitle">We make tracking easy</h2>
            <div className="AboutIconContainer">
                <div className="AboutIconItem One">
                    <p className="AboutIconText">Find Bug</p>
                    <SearchIcon />
                </div>
                <div className="AboutIconItem Two">
                    <p className="AboutIconText">Log Bug</p>
                    <BugReportIcon />
                </div>
                <div className="AboutIconItem Three">
                    <p className="AboutIconText">Fix Bug</p>
                    <CodeIcon />
                </div>
            </div>            
            <div className="AboutHowContainer" id="about">
                <h2 className="AboutTitle">How does is work</h2>
                <div className="AboutHowChecklist">
                    <p><DoneAllIcon />&nbsp;Stumble upon a bug</p>
                    <p><DoneAllIcon />&nbsp;Log the bug</p>
                    <p><DoneAllIcon />&nbsp;Assign the bug to a developer</p>
                    <p><DoneAllIcon />&nbsp;Update the bug</p>
                    <p><DoneAllIcon />&nbsp;Solve the bug</p>
                    <p><DoneAllIcon />&nbsp;Mark complete</p>
                    <p><DoneAllIcon />&nbsp;Finish that project</p>
                </div>
            </div>

            <div className="AhoutPayContainer">
                <h2 className="AboutTitle">Pay as you use</h2>
                <div className="AboutPayChecklist">
                    <div>
                    <p><CreditCardIcon />&nbsp;Pay for the bug credits you need</p>
                    <p><LocalMallIcon />&nbsp;Save the credits you don't use</p>
                    <p><UnsubscribeIcon/>&nbsp;Avoid the monthly subscriptions</p>
                    </div>
                </div>
            </div>

            <div className="AboutSignUp">
                <h2 className="AboutTitle">Lets get Started</h2>
                <div className="AboutSignUpList">
                    <p>Sign up today and purchase at our promotional price.</p>
                    <p><strike>$2.00/bug</strike></p>
                    <p><LocalOfferIcon />&nbsp;$1.00/bug</p>
                <a href="/auth/google" style={{ textDecoration: 'none' }}>
                    {/* <Button
                        variant='contained'
                        color='secondary'
                        size="large"
                    >
                        SignUp
                    </Button> */}
                </a>
                </div>
            </div>

        </div>
    )
}

export default About;