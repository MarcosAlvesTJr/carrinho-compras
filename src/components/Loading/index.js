import React from 'react';
import './styles.css'

function Loading({ children, show }) {
    return (
        <>
            {
                show ? (

                    <div id="loading-container">
                        Carregando...
                    </div>
                ) : (<>{children}</>)
            }
        </>
    );
}

export default Loading;