import React from "react";
import {connect} from "react-redux";
import {fetchList} from "../../redux/actions/ListAction";
import {List} from './List'

class ListContainer extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchList());
    }

    render() {
        const {list, fetched} = this.props;
        return (
            <List list={list} fetched={fetched}/>
        );
    }
}

function mapStateToProps(state) {
    const {list, fetched} = state.listReducer;
    return {
        list,
        fetched
    }
}

const connectedListPage = connect(mapStateToProps)(ListContainer);
export {connectedListPage as ListPage};