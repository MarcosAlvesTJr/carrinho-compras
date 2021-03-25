import React from 'react';
import './styles.css'

function Card({ children }) {
    return (
        <div className="card">{children}</div>
    );
}

function CardTitle({ children }) {
    return (
        <div className="card-title">{children}</div>
    );
}

function CardBody({ children }) {
    return (
        <div className="card-body" >{children}</div>
    );
}

function CardText({ children }) {
    return (
        <div className="card-text">{children}</div>
    );
}

function CardAction({ children }) {
    return (
        <div className="card-action">{children}</div>
    );
}


export { Card, CardBody, CardText, CardAction, CardTitle };