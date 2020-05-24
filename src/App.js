import "swiper/css/swiper.css";
import * as React from "react";
import { Router, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import * as Param from "./redux/Param";
import history from "./redux/history";

// import { checkUserAuthorized } from './utilities/Functions/SetupFunctions'

// import ClientList from './pages/PanelPages/Client/ClientList'
import Dashboard from "./pages/PanelPages/Dashboard/Dashboard";
import Events from "./pages/PanelPages/Events/Events";
import Manager from "./pages/PanelPages/Manager";
import CreateEvent from "./pages/PanelPages/Events/CreateEvent";
import Event from "./pages/PanelPages/Events/Event";
import Venue from "./pages/PanelPages/Venues/VenueList";
import CreateVenue from "./pages/PanelPages/Venues/VenueAddForm";
import BoxOffice from "./pages/PanelPages/BoxOffice";
import Reports from "./pages/PanelPages/Reports/Reports";
import CustomerResults from "./pages/PanelPages/CustomerResults/CustomerResults";
import CustomerDetails from "./pages/PanelPages/CustomerResults/CustomerDetails";
import OrderDetails from "./pages/PanelPages/CustomerResults/OrderDetails";
import DetailsReport from "./pages/PanelPages/Reports/DetailsReport";

//Main Container
import MainContainer from "./pages/PanelPages/Main/MainContainer";

//Front Pages
import Login from "./pages/FrontPages/Login";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "/",
      subPage: "/",
    };
  }

  onRouteChanged(page, subPage) {
    // checkUserAuthorized()
    if (this.state.page !== page) {
      this.setState({ page });
    }
    if (this.state.subPage !== subPage) {
      this.setState({ subPage });
    }
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route
            exact={true}
            path="/login"
            render={(props) => {
              return <Login {...props} />;
            }}
          />
          <Route
            exact={true}
            path="/box-office"
            render={(props) => {
              return <BoxOffice {...props} />;
            }}
          />

          <Route
            exact={true}
            path="/venues/create"
            render={(props) => {
              return <CreateVenue {...props} />;
            }}
          />
          <Route>
            <Switch>
              <MainContainer
                page={this.state.page}
                subPage={this.state.subPage}
                history={history}
              >
                <Route
                  exact={true}
                  path="/"
                  render={(props) => {
                    this.onRouteChanged("Dashboard", "/");
                    return <Dashboard {...props} />;
                  }}
                />
                <Route
                  exact={true}
                  path="/dashboard"
                  render={(props) => {
                    this.onRouteChanged("Dashboard", "/");
                    return <Dashboard {...props} />;
                  }}
                />
                <Route
                  exact={true}
                  path="/events-dashboard"
                  render={(props) => {
                    this.onRouteChanged("Events", "/");
                    return <Events {...props} />;
                  }}
                />
                <Route
                  exact={true}
                  path="/events/create"
                  render={(props) => {
                    this.onRouteChanged("Events", "/");
                    return <CreateEvent {...props} />;
                  }}
                />

                <Route
                  exact={true}
                  path="/event"
                  render={(props) => {
                    this.onRouteChanged("Events", "/");
                    return <Event {...props} />;
                  }}
                />
                <Route
                  exact={true}
                  path="/manage"
                  render={(props) => {
                    this.onRouteChanged("Manage", "/");
                    return <Manager {...props} />;
                  }}
                />
                <Route
                  exact={true}
                  path="/venues"
                  render={(props) => {
                    this.onRouteChanged("Manage", "/");
                    return <Venue {...props} />;
                  }}
                />
                <Route
                  exact={true}
                  path="/reports"
                  render={(props) => {
                    this.onRouteChanged("Reports", "/");
                    return <Reports {...props} />;
                  }}
                /> 
                <Route
                  exact={true}
                  path="/reports/report/:name"
                  render={(props) => {
                    this.onRouteChanged("Reports", "/");
                    return <DetailsReport {...props} />;
                  }}
                /> 
                <Route
                  exact={true}
                  path="/customer-results"
                  render={(props) => {
                    this.onRouteChanged("Customer", "/");
                    return <CustomerResults {...props} />;
                  }}
                />
                 <Route
                  exact={true}
                  path="/customer/:customerId"
                  render={(props) => {
                    this.onRouteChanged("Customer", "/");
                    return <CustomerDetails {...props} />;
                  }}
                /> 
                <Route
                  exact={true}
                  path="/order/:orderId"
                  render={(props) => {
                    this.onRouteChanged("Customer", "/");
                    return <OrderDetails {...props} />;
                  }}
                />
              </MainContainer>
            </Switch>
          </Route>
        </Switch>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};
const mapStateToProps = (state) => ({
  loading_page: state.param[Param.LOADING_PAGE],
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
