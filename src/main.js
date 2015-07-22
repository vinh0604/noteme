import "./stylesheets/base.scss";
import React from 'react';
import App from './javascripts/components/App';

main();

function main() {
    let app = document.createElement('div');
    document.body.appendChild(app);

    React.render(<App />, app);
}
