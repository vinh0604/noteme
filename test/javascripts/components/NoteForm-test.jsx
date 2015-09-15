import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import NoteForm from '../../../src/javascripts/components/NoteForm'

describe('noteForm', function () {
    let noteForm, renderedDOM;

    beforeEach(function () {
        let note = { title: 'Note 1', content: 'Note **content** 1' }

        noteForm = TestUtils.renderIntoDocument(<NoteForm note={note} />)
        renderedDOM = () => React.findDOMNode(noteForm)
    })

    it('renders title into text input', function () {
        let rootElem = renderedDOM()
        let titleElem = rootElem.querySelector('input[name="title"]')
        expect(titleElem.value).toEqual('Note 1')
    })

    it('renders content into textarea', function () {
        let rootElem = renderedDOM()
        let contentElem = rootElem.querySelector('textarea[name="content"]')
        expect(contentElem.value).toEqual('Note **content** 1')
    })
})
