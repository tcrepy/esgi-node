import React from 'react'
import {Provider} from 'react-redux'
import {Router, Route} from 'react-router-dom'
import {App} from "./App";
import {history} from "../_helper/history";
import {RegisterPage} from "./Users/RegisterContainer";
import {ListPage} from "./Nav/Page/ListPage";
import {LoginPage} from "./Nav/Page/LoginPage";


const Root = ({store}) => (
    <Provider store={store}>
        <div className="App">
            <Router history={history}>
                <Route path="/" component={App}/>
                <main>
                    <Route exact path='/list' component={ListPage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/register" component={RegisterPage}/>
                </main>
            </Router>
        </div>
    </Provider>
);

export default Root