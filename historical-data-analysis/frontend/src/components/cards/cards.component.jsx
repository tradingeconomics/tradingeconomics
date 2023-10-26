import React from "react";

import Card from 'react-bootstrap/Card';

import './cards.styles.css';

const Cards = ({ title, subtitle, children, className, style, titleClassName, subtitleClassName }) => {
  return (
    <Card 
      className={`${className}`} 
      bg="light" 
      text="dark"
      style={{style}}
      >
      <Card.Body>
        <Card.Title className={`${titleClassName}`}>{ title }</Card.Title>
        <Card.Subtitle className={`mb-2 ${subtitleClassName}`}>{ subtitle }</Card.Subtitle>
        {children}
      </Card.Body>
    </Card>
  );
}

export default Cards;