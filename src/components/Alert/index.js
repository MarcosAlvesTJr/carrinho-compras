import React from 'react';
import './styles.css'

function Alert({ text, show = false }) {
    return (
        <>
            {
                show && (
                    <div className="alert">
                        <p>
                            {text}
                        </p>
                    </div>
                )
            }
        </>

    );
}
export default Alert;