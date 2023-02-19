import React from "react";
import Feature from '../feature/Feature';
import './what.css';

const What = () => (
    <div className="pt_what section_margin" id="what">
        <div className="pt_what-feature">
            <Feature title="Why our tracker" text="Our bug tracking software strives to provide our consumers with a basic approach to service. Instead of subscribing to a service, you purchase credits as you go." />
        </div>
        <div className="pt_what-heading">
            <h1 className="gradient_text">Fast and simple solution to tracking your software</h1>
            <p>Explore our approach</p>
        </div>
        <div className="pt_what-container">
            <Feature title="Credit-based" text="Purchase the credits you need and save the rest for other projects." />
            <Feature title="Assign" text="Upload a photo of your software issues and assign a developer to fix the issue." />
            <Feature title="Resolve" text="Resolve the issues and communicate as a team." />
        </div>
    </div>
);

export default What;