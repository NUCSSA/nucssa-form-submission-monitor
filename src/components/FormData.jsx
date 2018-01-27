import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { observer, inject } from "mobx-react";
import { ListGroupItem, ListGroup } from "react-bootstrap";
import FormDataGrid from './FormDataGrid';
import queryString from "query-string";
import _ from 'lodash';


@inject('store')
@withRouter
@observer
class FormData extends React.Component {
    constructor(props) {
        super(props);
        let parsed = queryString.parse(props.location.search);
        this.state = {
            parsed
        };

    }
    static renderRow(row) {
        let rowHtml = [];
        _.forOwn(row, function(value, key) {
            rowHtml.push(<ListGroupItem key={key}>{key} : {value}</ListGroupItem>);
        });
        return (
            <div>
                <ListGroup>
                    {rowHtml}
                </ListGroup>
            </div>
        )
    }

    static renderFormData(dataArray) {
        return (
            <div>
                {
                    dataArray.map((r, idx) => {
                        return (
                            <div key={idx}>
                                {FormData.renderRow(r)}
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    render() {
        let { isLoadingFormsData, formsDataMap } = this.props.store;
        if (isLoadingFormsData === true) {
            return (
                <div>
                    <h1>
                        Loading
                    </h1>
                </div>
            );
        }
        let { parsed } = this.state;
        let id = parsed["id"];

        if (_.isNil(id)) {
            return (
                <div>
                    <h1>
                        Incorrect Query String
                    </h1>
                </div>
            );
        }
        let formData = formsDataMap[id];
        if (_.isNil(formData)) {
            return (
                <div>
                    <h1>
                        表单不存在，如果你确定表单存在，请联系我们 nucssait@gmail.com
                    </h1>
                </div>
            );
        }

        return (
            <div>
                <h1>{formData.title}</h1>
                <h2>报名人数: {formData.data.length}</h2>
                <FormDataGrid
                    data={formData.data}
                />
            </div>
        )
    }

}

export default FormData;
