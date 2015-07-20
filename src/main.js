import "./stylesheets/base.scss";
import component from './javascripts/component';

var app = document.createElement('div');

document.body.appendChild(app);
app.appendChild(component());
