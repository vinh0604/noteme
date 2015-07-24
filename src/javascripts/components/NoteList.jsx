import React from 'react'
import NoteLine from './NoteLine'

export default class NoteList extends React.Component {
    render() {
        return (<ul>
                    {this.props.notes.map((note) => {
                        return (<NoteLine note={note} />);
                    })}
                </ul>);
    }
}
