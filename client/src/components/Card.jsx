// components/Card.jsx
import React from 'react';
import './Card.css'; // Create a CSS file for card styling

const Card = ({ title, children, onEdit, onDetails }) => {
    return (
        <div className='card'>
            <h3>{title}</h3>
            <div className='card-content'>
                {children}
            </div>
            <div className='card-buttons'>
                <button onClick={onEdit}>Edit</button>
                <button onClick={onDetails}>Details</button>
            </div>
        </div>
    );
};

export default Card;
