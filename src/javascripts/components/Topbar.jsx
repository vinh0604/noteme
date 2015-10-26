import React from 'react'
import Actions from '../actions/index'

export default class Topbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            popupStyle: { display: 'none' },
            keyword: '',
            selectedTags: []
        }
    }

    addNote() {
        Actions.addNote()
    }

    searchNote() {
        Actions.searchNote(this.state.keyword, this.state.selectedTags)
    }

    onKeywordChanged(event) {
        this.setState({ keyword: event.target.value }, function () {
            this.searchNote()
        })
    }

    onTagsChanged(event) {
        this.setState({ selectedTags: event.target.value }, function () {
            this.searchNote()
        })
    }

    toggleTagPopup() {
        if (this.state.popupStyle.display === 'block') {
            this.setState({ popupStyle: { display: 'none' } })
        } else {
            this.setState({ popupStyle: { display: 'block' } })
        }
    }

    render() {
        return (
            <div className="sidebar__topbar">
                <div className="sidebar__topbar__search-widget">
                    <input type="text" name="keyword" id="keyword" placeholder="Search note..." onChange={this.onKeywordChanged.bind(this)}/>
                    <i className="fa fa-search"></i>
                </div>
                <ul className="sidebar__topbar__buttons">
                    <li>
                        <a href="#" onClick={this.toggleTagPopup.bind(this)}><i className="fa fa-tags"></i></a>
                    </li>
                    <li>
                        <a href="#" onClick={this.addNote.bind(this)}><i className="fa fa-plus"></i></a>
                    </li>
                </ul>
                <div className="sidebar__topbar__tags" style={this.state.popupStyle}>
                    <select name="tags" id="tags" multiple="multiple" data-placeholder="Filter tags..." onChange={this.onTagsChanged.bind(this)}>
                        {this.props.tags.map(function (tag) {
                            return (<option key={tag} value={tag}>{tag}</option>)
                        })}
                    </select>
                </div>
            </div>);
    }
}
