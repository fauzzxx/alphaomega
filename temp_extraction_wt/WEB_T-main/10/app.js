import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
    const name = "Student";

    return (
        <div>
            <h2>Hello {name}</h2>
            <p>This HTML is rendered using JSX in React.</p>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
