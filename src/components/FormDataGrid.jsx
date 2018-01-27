import React from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Media from "react-media"

class FormDataGrid extends React.Component {
    constructor(props) {
        super(props);
        this.formKeys = Object.keys(props.data[0]);
        this.renderBootstrapTable = this.renderBootstrapTable.bind(this);
        this.renderSmallBootstrapTable = this.renderSmallBootstrapTable.bind(this);
    }

    renderSmallBootstrapTable() {
        console.log('here');
         return (
                <BootstrapTable data={this.props.data} search striped hover pagination>
                    {this.formKeys
                        .filter((k) => {
                            return k === '姓名'
                                || k === '邮箱'
                                || k === '电话'
                                || k === 'timestamp';
                        })
                        .map((k) => {
                            if(k === 'timestamp') {
                                return <TableHeaderColumn
                                    hidden
                                    isKey
                                    dataSort
                                    key={k} dataField={k}>
                                    {k}
                                </TableHeaderColumn>
                            }
                            return (<TableHeaderColumn
                                key={k}
                                dataSort
                                dataField={k}>
                                {k}
                            </TableHeaderColumn>);
                        })}
                </BootstrapTable>
            );
    }
    renderBootstrapTable() {
        return (
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


    render() {
        return(
            <div>
                <Media query="(max-width: 599px)">
                    {matches =>
                        matches ? this.renderSmallBootstrapTable() : this.renderBootstrapTable()
                    }
                </Media>
                <Media query="(max-width: 599px)">
                    {matches =>
                        matches ? (
                            <p>The document is less than 600px wide.</p>
                        ) : (
                            <p>The document is at least 600px wide.</p>
                        )
                    }
                </Media>
            </div>

        );
    }
}

export default FormDataGrid;
