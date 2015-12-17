import React from 'react'
import Navbar from './Navbar'
import Masthead from './Masthead'
import Transaction from './Transaction'

class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div className='main'>
                    <Masthead title="Transaction Table">
                        This table shows all your bank transactions
                    </Masthead>
                    <Transaction></Transaction>
                </div>
            </div>
        )
    }
}

export default App