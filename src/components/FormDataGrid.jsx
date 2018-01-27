import React from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class FormDataGrid extends React.Component {
    constructor(props) {
        super(props);
        this.formKeys = Object.keys(props.data[0]);
    }

    render() {
        return(
            <BootstrapTable data={this.props.data} search striped hover pagination exportCSV>
                {this.formKeys
                    .filter((k) => {
                        return k !== 'user'
                            && k !== 'user_ip'
                            && k !== 'post_id'
                            && k !== 'parent_post_id'
                            && k !== 'unique_id';
                    })
                    .map((k) => {
                    if(k === 'timestamp') {
                        return <TableHeaderColumn
                            isKey
                            dataSort
                            key={k} dataField={k}>
                            {k}
                        </TableHeaderColumn>
                    } else {
                        return <TableHeaderColumn
                            key={k}
                            dataSort
                            dataField={k}>
                            {k}
                            </TableHeaderColumn>
                    }
                })}
            </BootstrapTable>
        );
    }
}

export default FormDataGrid;
