import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import NoteList from '../../../src/javascripts/components/NoteList'
import NoteLine from '../../../src/javascripts/components/NoteLine'
import $ from 'jquery'
window.jQuery = $
require('jasmine-jquery/lib/jasmine-jquery')

describe('noteList', () => {
    var renderedDOM, noteList;
    var exampleNotes = [
        { id: 1, title: 'Note 1', content: 'Note content 1' },
        { id: 2, title: 'Note 2', content: 'Note content 2' }
    ]

    beforeEach(() => {
        noteList = TestUtils.renderIntoDocument(<NoteList notes={exampleNotes} />)
        renderedDOM = () => React.findDOMNode(noteList)
    });

    it('renders correct list of note lines', () => {
        let rootElem = renderedDOM()
        expect(rootElem.querySelectorAll('li.sidebar__item').length).toEqual(2)
    })

    it('shows tag popup if tagClick event occur on some note', () => {
        let rootElem = renderedDOM()
        let tagPopUpElem = rootElem.querySelector('.sidebar__list__tags')

        noteList.handleTagClick(exampleNotes[1], { top: 0 })
        expect(tagPopUpElem).toHaveCss({ display: 'block' })
        expect($(tagPopUpElem).css('top')).toEqual('35px')
    })

    it('selects the note with tagClick event occur', () => {
        let rootElem = renderedDOM()
        noteList.handleTagClick(exampleNotes[1], { top: 0 })
        expect(noteList.state.selectedNote.id).toEqual(exampleNotes[1].id)
    })

    it('hide the popup when tagClick event occur again on same note', () => {
        let rootElem = renderedDOM()
        let tagPopUpElem = rootElem.querySelector('.sidebar__list__tags')

        noteList.handleTagClick(exampleNotes[1], { top: 0 })
        noteList.handleTagClick(exampleNotes[1], { top: 0 })
        expect(tagPopUpElem).toHaveCss({ display: 'none' })
    })
})
