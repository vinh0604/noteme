import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import expect from 'expect'
import Sidebar from '../../../src/javascripts/components/Sidebar'
import Topbar from '../../../src/javascripts/components/Topbar'
import NoteList from '../../../src/javascripts/components/NoteList'

describe('sidebar', () => {
    var renderer;

    beforeEach(() => {
        renderer = TestUtils.createRenderer();
        renderer.render(<Sidebar />)
    });

    it('has top bar and note list', () => {
        let result = renderer.getRenderOutput();

        expect(result).toEqual(
            <div>
                <Topbar />
                <NoteList />
            </div>
        );
    })
})
