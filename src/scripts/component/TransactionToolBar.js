import React from 'react';

class TransactionToolBar extends React.Component {
    render() {


        return (
            <div className="btn-toolbar toolbar" role="toolbar" aria-label="Tool Bar">
                <button type="button" className="btn btn-default">
                    <span className="glyphicon glyphicon-plus" aria-hidden="true"> New</span>
                </button>
                <button type="button" className="btn btn-default">
                    <span className="glyphicon glyphicon-trash" aria-hidden="true"> Delete</span>
                </button>
            </div>
        )
    }
}

export default TransactionToolBar;
