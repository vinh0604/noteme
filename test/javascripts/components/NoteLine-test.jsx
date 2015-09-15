import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import NoteLine from '../../../src/javascripts/components/NoteLine'

describe('noteLine', () => {
    var noteLine, renderedDOM;

    beforeEach(() => {
        let note = { title: 'Note 1', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint perspiciatis dolorum quia eveniet, sunt fugit? Optio sit officiis aliquid. Totam nulla adipisci, hic quis consectetur cumque in doloribus, officia quod.' };
        noteLine = TestUtils.renderIntoDocument(<NoteLine note={note} />);
        renderedDOM = () => React.findDOMNode(noteLine);
    })

    it('renders with a li element', () => {
        let rootElem = renderedDOM();
        expect(rootElem.tagName).toEqual('LI');
    })

    it('renders correct note title', () => {
        let rootElem = renderedDOM();
        expect(rootElem.querySelector('h4').textContent).toEqual("Note 1")
    })

    it('renders with content summary', () => {
        let rootElem = renderedDOM();
        let contentElem = rootElem.querySelector('p')
        expect(contentElem.textContent).toEqual('Lorem ipsum dolor sit amet, consectetur...')
    })

    it('renders with buttons group', () => {
        let rootElem = renderedDOM()
        let buttonsElems = rootElem.querySelectorAll('li > a')
        expect(buttonsElems[0].getAttribute('title')).toEqual('Tag')
        expect(buttonsElems[1].getAttribute('title')).toEqual('Archive')
        expect(buttonsElems[2].getAttribute('title')).toEqual('Delete')
    })
})
