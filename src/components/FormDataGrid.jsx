import React from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class FormDataGrid extends React.Component {
    constructor(props) {
        super(props);
        this.formKeys = Object.keys(props.data[0]);
    }

    render() {
        return(
            <BootstrapTable data={this.props.data} striped hover pagination>
                {this.formKeys.map((k) => {
                    if(k === 'unique_id') {
                        return <TableHeaderColumn
                            isKey
                            dataSort
                            filter={ { type: 'TextFilter' } }
                            key={k} dataField={k}>
                            {k}
                        </TableHeaderColumn>
                    } else {
                        return <TableHeaderColumn
                            key={k}
                            dataSort
                            filter={ { type: 'TextFilter' } }
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
