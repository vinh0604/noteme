import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react/lib/ReactTestUtils'
import NoteList from '../../../src/javascripts/components/NoteList'
import $ from 'jquery'
window.jQuery = $
require('jasmine-jquery/lib/jasmine-jquery')
import Actions from '../../../src/javascripts/actions/index'

describe('noteList', () => {
    var renderedDOM, noteList;
    var exampleNotes = [
        { id: 1, title: 'Note 1', content: 'Note content 1', tags: ['hello'] },
        { id: 2, title: 'Note 2', content: 'Note content 2' }
    ]
    var tags = ['hello', 'world']

    beforeEach(() => {
        noteList = TestUtils.renderIntoDocument(<NoteList notes={exampleNotes} tags={tags} />)
        renderedDOM = () => ReactDOM.findDOMNode(noteList)
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

    it('shows list of available tags in popup', () => {
        let rootElem = renderedDOM()
        let tagSelectElem = rootElem.querySelector('select[name="tags"]')
        expect(tagSelectElem.querySelector('option[value="hello"]')).not.toBeNull()
        expect(tagSelectElem.querySelector('option[value="world"]')).not.toBeNull()
    })

    it('selects tags of selected note', () => {
        let rootElem = renderedDOM()
        let tagSelectElem = rootElem.querySelector('select[name="tags"]')
        noteList.setState( {selectedNote: exampleNotes[0]}, function () {
            expect(tagSelectElem.querySelector('option[value="hello"]').selected).toEqual(true)
            expect(tagSelectElem.querySelector('option[value="world"]').selected).toEqual(false)
        } )
    })

    it('dispatches saveNote when selected tag is changed', () => {
        spyOn(Actions, 'saveNote')
        let rootElem = renderedDOM()
        let tagSelectElem = rootElem.querySelector('select[name="tags"]')

        noteList.setState( {selectedNote: exampleNotes[0]}, function () {
            TestUtils.Simulate.change(tagSelectElem, { target: { value: ['hello', 'world'] } })
            expect(Actions.saveNote).toHaveBeenCalledWith({ id: 1, title: 'Note 1', content: 'Note content 1', tags: ['hello', 'world'] })
        } )
    })

    it('does not dispatch saveNote when selected note is changed', () => {
        spyOn(Actions, 'saveNote')
        let rootElem = renderedDOM()
        let tagSelectElem = rootElem.querySelector('select[name="tags"]')

        noteList.setState( {selectedNote: exampleNotes[0]}, function () {
            noteList.setState( {selectedNote: exampleNotes[1]}, function () {
                expect(Actions.saveNote).not.toHaveBeenCalled()
            })
        })
    })
})
