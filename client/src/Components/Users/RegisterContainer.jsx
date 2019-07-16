import React from 'react';
import {connect} from 'react-redux';
import {userActions} from "../../redux/actions/UserAction";

class RegisterContainer extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        if (localStorage.user) {
            this.props.dispatch(userActions.logout());
        }

        this.state = {
            email: '',
            password: '',
            passwordRepeat: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({submitted: true});
        const {username, password} = this.state;
        const {dispatch} = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const {loggingIn, loggedOut} = this.props;
        const {username, password, submitted} = this.state;
        return (
            <></>
        );
    }
}

function mapStateToProps(state) {
    const {registering} = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterContainer);
export {connectedRegisterPage as RegisterPage};