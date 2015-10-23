import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import Sidebar from '../../../src/javascripts/components/Sidebar'
import Topbar from '../../../src/javascripts/components/Topbar'
import NoteList from '../../../src/javascripts/components/NoteList'

describe('sidebar', () => {
    var renderer;
    var notes = [{ title: 'Note 1', content: 'Note **content** 1' }]

    beforeEach(() => {
        renderer = TestUtils.createRenderer();
        renderer.render(<Sidebar notes={notes} />)
    });

    it('has top bar and note list', () => {
        let result = renderer.getRenderOutput();

        expect(result).toEqual(
            <div>
                <Topbar notes={notes}/>
                <NoteList notes={notes}/>
            </div>
        );
    });
})
