import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {App} from "./App";
import {ListPage} from "./TechWatch/ListContainer";
import {LoginPage} from "./Users/LoginContainer";

const Root = ({store}) => (
    <Provider store={store}>
        <div className="App">
            <Router>
                <Route path="/" component={App}/>
                <main>
                    <Route path="/list" component={ListPage}/>
                    <Route path="/login" component={LoginPage}/>
                </main>
            </Router>
        </div>
    </Provider>
);

export default Root