import React from 'react';

class Masthead extends React.Component {

    render() {
        return (
            <div className='bs-masthead'>
                <div className="container">
                    <h1>{this.props.title}</h1>
                    <p className="lead">{this.props.children}</p>
                </div>
            </div>
        )
    }
}

export default Masthead;