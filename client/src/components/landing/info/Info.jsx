import React from 'react';
import Feature from '../feature/Feature';
import './info.css';

const featuresData = [
    {
        title: 'Credit-based',
        text: 'Purchase the credits you need and save the rest for other projects.',
      },
      {
        title: 'Assign',
        text: 'Upload a photo of your software issues and assign a developer to fix the issue.',
      },
      {
        title: 'Resolve',
        text: 'Resolve the issues and communicate as a team.',
      },
      {
        title: 'Save your Credits',
        text: 'Use credits as needed and store the remaining credits for future projects.',
      },
];

const Info = () => (
    <div className='pt_features section_padding' id='features'>
        <div className='pt_features-heading'>
            <h1 className='gradient_text'>
            Cutting edge technology and advancement for optimaization and exceptional performance.
            </h1>
        </div>
        <div className='pt_features-container'>
            {featuresData.map((item, index) => (
                <Feature title={item.title} text={item.text} key={item.title + index} />
            ))}
        </div>
    </div>
);

export default Info;