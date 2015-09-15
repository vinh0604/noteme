import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import App from '../../../src/javascripts/components/App'
import Sidebar from '../../../src/javascripts/components/Sidebar'
import MainPanel from '../../../src/javascripts/components/MainPanel'

describe('app', () => {
    var renderer;

    beforeEach(() => {
        renderer = TestUtils.createRenderer();
        renderer.render(<App />)
    });

    it('has sidebar and main panel', () => {
        let result = renderer.getRenderOutput();

        expect(result).toEqual(
            <div>
                <Sidebar />
                <MainPanel />
            </div>
        );
    })
})
