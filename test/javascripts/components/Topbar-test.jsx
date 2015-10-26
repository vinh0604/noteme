import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react/lib/ReactTestUtils'
import Topbar from '../../../src/javascripts/components/Topbar'
import Actions from '../../../src/javascripts/actions/index'

describe('topbar', () => {
    let topbar, renderedDOM;
    let tags = ["hello", "world"];

    beforeEach(function () {
        topbar = TestUtils.renderIntoDocument(<Topbar tags={tags} />)
        renderedDOM = () => ReactDOM.findDOMNode(topbar)
    })

    it('renders search widget', () => {
        let rootElem = renderedDOM()
        expect(rootElem.querySelector('.sidebar__topbar__search-widget')).not.toBeNull()
        expect(rootElem.querySelector('input[name="keyword"]')).not.toBeNull()
    })

    it('renders add and tag button', function () {
        let rootElem = renderedDOM()
        expect(rootElem.querySelector('.sidebar__topbar__buttons .fa-plus')).not.toBeNull()
        expect(rootElem.querySelector('.sidebar__topbar__buttons .fa-tags')).not.toBeNull()
    })

    it('dispatches addNote action when add button is clicked', function () {
        spyOn(Actions, 'addNote')
        let rootElem = renderedDOM()
        let addElem = rootElem.querySelector('.sidebar__topbar__buttons .fa-plus')
        TestUtils.Simulate.click(addElem)
        expect(Actions.addNote).toHaveBeenCalled()
    })

    it('dispatches searchNote action when search text changed', function () {
        spyOn(Actions, 'searchNote')
        let rootElem = renderedDOM()
        let searchElem = rootElem.querySelector('input[name="keyword"]')
        searchElem.value = 'Note'
        TestUtils.Simulate.change(searchElem)
        expect(Actions.searchNote).toHaveBeenCalledWith('Note')
    })

    it('shows tags dialog when tag button is clicked', function () {
        let rootElem = renderedDOM()
        let tagsPopupElem = rootElem.querySelector('.sidebar__topbar__tags')
        expect(tagsPopupElem).toHaveCss({ display: 'none' })

        let tagElem = rootElem.querySelector('.sidebar__topbar__buttons .fa-tags')
        TestUtils.Simulate.click(tagElem)
        expect(tagsPopupElem).toHaveCss({ display: 'block' })
    })

    it('shows list of available tags as options for tag filter', function () {
        let rootElem = renderedDOM()
        let tagSelectElem = rootElem.querySelector('select[name="tags"]')
        expect(tagSelectElem.querySelector('option[value="hello"]')).not.toBeNull()
        expect(tagSelectElem.querySelector('option[value="world"]')).not.toBeNull()
    })
})
