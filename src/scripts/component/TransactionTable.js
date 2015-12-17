import React from 'react';

class TransactionTable extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        $.getJSON("data.json",
            function(respData){
                this.setState({data: respData})
            }.bind(this));

        //$("#TransTable").selectable({
        //    filter:'tbody tr',
        //    selected: function(event, ui){
        //        console.log( "SELECTED " + $(ui.selected).find("th").html() );
        //    }
        //});
    }

    render() {
        var rows = this.state.data.map(function(value, i){
            return (
                <tr key={i}>
                    <td key='1'>{value.key}</td>
                    <td key='2'>{value.name}</td>
                    <td key='3'>{value.amount}</td>
                </tr>
            )
        });

        return (<div className="table-responsive transaction-table">
            <table className="table table-bordered table-striped" id="TransTable">
                <thead>
                    <tr>
                        <td>id</td>
                        <td>name</td>
                        <td>amount</td>
                    </tr>
                </thead>
                <tbody>
              {rows}
                </tbody>
            </table>
        </div>
        )
    }
}

export default TransactionTable;
