import React from "react";
import {connect} from "react-redux";
import {fetchList} from "../../redux/actions/ListAction";
import {Header} from "./Header";

class ListContainer extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchList());
    }

    render() {
        const {loggedIn} = this.props;
        return (
            <Header loggedIn={loggedIn}/>
        );
    }
}

function mapStateToProps(state) {
    const {loggedIn} = state.authentication;
    return {
        loggedIn
    };
}

const connectedHeaderPage = connect(mapStateToProps)(ListContainer);
export {connectedHeaderPage as HeaderPage};