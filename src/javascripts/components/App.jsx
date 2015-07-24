import React from 'react'
import Sidebar from './Sidebar'
import MainPanel from './MainPanel'

export default class App extends React.Component {
    render() {
        return (<div>
                    <Sidebar />
                    <MainPanel />
                </div>);
    }
}
