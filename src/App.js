import 'swiper/css/swiper.css'
import * as React from 'react';
import {
    Router,
    Route,
    Switch
} from 'react-router-dom'

import { connect } from 'react-redux'
import * as Param from './redux/Param'
import history from './redux/history'

import { checkUserAuthorized } from './utilities/Functions/SetupFunctions'


//Company admin pages
import ClientList from './pages/PanelPages/Client/ClientList'
import Dashboard from './pages/PanelPages/Dashboard/Dashboard'
import Events from './pages/PanelPages/Events/Events'


//Main Container
import MainContainer from './pages/PanelPages/Main/MainContainer'


//Front Pages
import Login from './pages/FrontPages/Login'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: '/',
            subPage: '/'
        };
    }

    onRouteChanged(page, subPage) {
        // checkUserAuthorized()
        if (this.state.page !== page) {
            this.setState({ page })
        }
        if (this.state.subPage !== subPage) {
            this.setState({ subPage })
        }
    }


    render() {
        return (
            <Router history={history} >
                <Switch>
                    <Route exact={true} path="/"
                        render={(props) => {
                            return <Login {...props} />;
                        }} />
                    <Route>
                        <Switch>

                            <MainContainer
                                page={this.state.page}
                                subPage={this.state.subPage}
                                history={history}
                            >
                                <Route exact={true} path="/clients"
                                    render={(props) => {
                                        this.onRouteChanged('Clients', '/');
                                        return <ClientList {...props} />;
                                    }} />
                                <Route exact={true} path="/dashboard"
                                    render={(props) => {
                                        this.onRouteChanged('Dashboard', '/');
                                        return <Dashboard {...props} />
                                    }} />
                                    <Route exact={true} path="/events-dashboard"
                                    render={(props) => {
                                        this.onRouteChanged('Events', '/');
                                        return <Events {...props} />
                                    }} />
                            </MainContainer>

                        </Switch>
                    </Route>
                </Switch>
            </Router>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    }
}
const mapStateToProps = (state) => ({
    loading_page: state.param[Param.LOADING_PAGE]
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
