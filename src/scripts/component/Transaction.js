/**
 * Created by tang.hao on 16/12/2015.
 */
import TransactionTable from "./TransactionTable"
import TransactionToolBar from "./TransactionToolBar"

import React from 'react';

class Transaction extends React.Component{
    render(){
        return (
            <div className="container transaction">
                <TransactionToolBar></TransactionToolBar>
                <TransactionTable></TransactionTable>
            </div>
        );
    }
}

export default Transaction;
