import React from 'react'

export default class NoteLine extends React.Component {
    render() {
        return (<li>{this.props.note.title}</li>);
    }
}
