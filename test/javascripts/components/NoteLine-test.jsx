import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import expect from 'expect'
import NoteLine from '../../../src/javascripts/components/NoteLine'

describe('noteLine', () => {
    var noteLine, renderedDOM;

    beforeEach(() => {
        let note = { title: 'Note 1', content: 'Note content 1' };
        noteLine = TestUtils.renderIntoDocument(<NoteLine note={note} />);
        renderedDOM = () => React.findDOMNode(noteLine);
    });

    it('renders with a li element', () => {
        let rootElem = renderedDOM();
        expect(rootElem.tagName).toEqual('LI');
    })

    it('renders correct note title', () => {
        let rootElem = renderedDOM();
        expect(rootElem.textContent).toEqual("Note 1")
    });
})
