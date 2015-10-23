import "./stylesheets/base.scss";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './javascripts/components/App';

main();

function main() {
    let app = document.createElement('div');
    document.body.appendChild(app);

    ReactDOM.render(<App />, app);
}
