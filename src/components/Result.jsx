import React from 'react';
import {Card} from "react-bootstrap";

export const Result = React.memo(({variant = 'Secondary', header, message, icon}) => {
  return (
    <Card
      style={{maxWidth: '280px'}}
      className='my-3 mx-auto'
      bg={variant.toLowerCase()}
    >
      <Card.Body>
        <Card.Title className='d-flex align-items-center'>{icon}<span className={icon && 'ms-1'}>{header}</span></Card.Title>
        <Card.Text>
          {message}
        </Card.Text>
      </Card.Body>
    </Card>
  )
})
