import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NotefulApp({renderNavRoutes, renderMainRoutes}) {
    return (
        <div>
            <div className="App">
                    <nav className="App__nav">
                        {renderNavRoutes()}
                    </nav>
                    
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{renderMainRoutes()}</main>
                </div>
        </div>
    )
}
