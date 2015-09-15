import React from 'react'
import Utils from '../utils'

export default class NoteLine extends React.Component {
    render() {
        return (<li>
                    <h4>{this.props.note.title}</h4>
                    <p>{Utils.truncate(this.props.note.content, 50)}</p>
                    <ul>
                        <li><a href="#" title="Tag"><i class="fa fa-tag"></i></a></li>
                        <li><a href="#" title="Archive"><i class="fa fa-check"></i></a></li>
                        <li><a href="#" title="Delete"><i class="fa fa-trash"></i></a></li>
                    </ul>
                </li>);
    }
}
