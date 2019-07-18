import React from 'react'
import {Router, Route} from 'react-router-dom'
import {App} from "./App";
import {history} from "../_helper/history";
import {RegisterContainer} from "./Users/RegisterContainer";
import {LoginProvider} from "../Provider/LoginProvider";
import {LinkConstants} from "../_constants/link.constants";
import {AlertProvider} from "../Provider/AlertProvider";
import {LoginContainer} from "./Users/LoginContainer";
import {LogoutContainer} from "./Users/LogoutContainer";
import {CategoryProvider} from "../Provider/CategoryProvider";
import {CategoriesList} from "./TechWatch/CategoriesList";
import {PostProvider} from "../Provider/PostProvider";
import {PostsList} from "./TechWatch/PostsList";
import {AddContainer} from "./TechWatch/AddContainer";
import {CategoryCreate} from "./TechWatch/CategoryCreate";
import {ProfilContainer} from "./Users/ProfilContainer";
import {UserProvider} from "../Provider/UserProvider";


const Root = () => (
    <div className="App">
        <AlertProvider>
            <LoginProvider>
                <Router history={history}> <Route path="/" component={App}/>
                    <main>

                        <Route exact path={LinkConstants.LOGIN} component={LoginContainer}/>
                        <Route exact path={LinkConstants.LOGOUT} component={LogoutContainer}/>
                        <Route exact path={LinkConstants.REGISTER} component={RegisterContainer}/>


                        <PostProvider>
                        <Route exact path={LinkConstants.POST_LIST} component={PostsList}/>
                            <CategoryProvider>
                                <Route exact path={LinkConstants.POST_CREATE} component={AddContainer}/>
                            </CategoryProvider>
                        </PostProvider>

                        <CategoryProvider>
                            <Route exact path={LinkConstants.CATEGORY_LIST} component={CategoriesList}/>
                            <Route exact path={LinkConstants.CATEGORY_CREATE} component={CategoryCreate}/>
                        </CategoryProvider>
                        <UserProvider><Route exact path={`${LinkConstants.USER_PROFIL}/:id`} component={ProfilContainer}/></UserProvider>
                    </main>
                </Router>
            </LoginProvider>
        </AlertProvider>
    </div>
);

export default Root