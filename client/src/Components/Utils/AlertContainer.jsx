import {connect} from "react-redux";
import React from "react";
import {history} from "../../_helper/history";
import {alertActions} from "../../redux/actions/AlertAction";
import {AlertConf, AlertError} from "./Alert";
import {alertConstants} from "../../_constants/alert.constants";

class AlertContainer extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.dispatch(alertActions.clear());
        });
    }

    render() {
        const {alert} = this.props;
        switch (alert.type) {
            case alertConstants.SUCCESS:
                return <AlertConf message={alert.message}/>;
            case alertConstants.ERROR:
                return <AlertError message={alert.message}/>;
            default:
                return <></>;
        }
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedAlert = connect(mapStateToProps)(AlertContainer);
export { connectedAlert as Alert };