import React  from "react";
import { observer, inject } from "mobx-react";

import { ListGroup, ListGroupItem } from "react-bootstrap";

@inject('store')
@observer
class FormList extends React.Component {
    componentWillMount() {
        this.renderFormData = this.renderFormData.bind(this);
    }

    renderFormData() {
        let { formsData } = this.props.store;

        return (
            <ListGroup>
                {formsData
                    .map((formData, idx) => {
                    return (
                        <ListGroupItem key={idx} onClick={() => {
                            this.props.history.push(`/form?id=${formData.id}`);
                        }}>
                            {formData.title}
                        </ListGroupItem>
                    );
                })}
            </ListGroup>
        );
    }
  render() {
        let { isLoadingFormsData } = this.props.store;
        if (isLoadingFormsData === true) {
            return (
                <div>
                    <h1>
                        Loading
                    </h1>
                </div>
            );
        }
        return (
            <div>
                <h1>NUCSSA报名表信息</h1>
                {this.renderFormData()}
            </div>
        );

  }

}

export default FormList;
