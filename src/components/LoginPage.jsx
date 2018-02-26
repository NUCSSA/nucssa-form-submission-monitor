import React  from "react";
import { observer, inject } from "mobx-react";

import { FormControl, Button, Alert } from "react-bootstrap";

@inject('store')
@observer
class LoginPage extends React.Component {
    componentWillMount() {
        this.state = {
            password: '',
            incorrectPassword: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.renderErrorMessage = this.renderErrorMessage.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            password: e.target.value
        });

    }

    handleSignIn(e) {
        e.preventDefault();
        let store = this.props.store;
        store.checkPassword(this.state.password);

        this.setState({
            password: '',
            incorrectPassword: true,
        });
    }

    renderErrorMessage() {
        console.log("hello");
        if (this.state.incorrectPassword) {
            return (
                <Alert bsStyle="danger">
                    <strong>Incorrect Password</strong>
                </Alert>
            );
        }
    }

    render() {

        return (
            <div>
                <h1>Password</h1>
                { this.renderErrorMessage() }
                <form>
                        <FormControl
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />

                </form>
                <Button bsStyle="primary" onClick={this.handleSignIn}>Sign In</Button>


            </div>);

    }

}

export default LoginPage;
