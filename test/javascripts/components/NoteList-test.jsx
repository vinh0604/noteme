import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import NoteList from '../../../src/javascripts/components/NoteList'
import NoteLine from '../../../src/javascripts/components/NoteLine'

describe('noteList', () => {
    var renderer, renderedDOM, noteList;
    var exampleNotes = [
        { title: 'Note 1', content: 'Note content 1' },
        { title: 'Note 2', content: 'Note content 2' }
    ]

    beforeEach(() => {
        renderer = TestUtils.createRenderer()
        renderedDOM = () => React.findDOMNode(noteLine);
    });

    it('renders correct list of note lines', () => {
        renderer.render(<NoteList notes={exampleNotes} />)
        let result = renderer.getRenderOutput();

        expect(result).toEqual(
            <ul>
                <NoteLine note={exampleNotes[0]} />
                <NoteLine note={exampleNotes[1]} />
            </ul>
        );
    })
})
