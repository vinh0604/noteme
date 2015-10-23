import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react/lib/ReactTestUtils'
import NoteView from '../../../src/javascripts/components/NoteView'

describe('noteView', function () {
    let noteView, renderedDOM;

    beforeEach(function () {
        let note = { title: 'Note 1', content: 'Note **content** 1' }

        noteView = TestUtils.renderIntoDocument(<NoteView note={note} />)
        renderedDOM = () => ReactDOM.findDOMNode(noteView)
    })

    it('renders with a h4 title', function () {
        let rootElem = renderedDOM()
        let titleElem = rootElem.querySelector('h4')
        expect(titleElem.textContent).toEqual('Note 1')
    })

    it('renders with formatted markdown content', function () {
        let rootElem = renderedDOM()
        let contentElem = rootElem.querySelector('div')
        expect(contentElem.innerHTML).toEqual('<p>Note <strong>content</strong> 1</p>\n')
    })
})
