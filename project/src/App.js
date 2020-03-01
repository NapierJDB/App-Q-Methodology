import React from "react";
import Home from './layouts/Home';
import RegForm from './layouts/RegForm';
import AdminPanel from "./layouts/AdminPanel";
import SurveyOverview from './layouts/SurveyOverview';
import CreateSurvey from './layouts/CreateSurvey';
import PrivacyScreen from './layouts/PrivacyScreen';
import Reject from './layouts/Reject'
import NewAnchors from './layouts/NewAnchors';
import NewStatements from './layouts/NewStatements';
import Debrief from './layouts/Debrief'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import decode from 'jwt-decode';
import { MyProvider } from './Context';
import Test from './layouts/Test'

/*const checkAuth = () => {
  const token = localStorage.getItem('token')

  if (!token) {
    return false;
  }

  try {
    const payload = decode(token);
    console.log(payload)

  } catch (e) {
    return false;
  }

  return true;
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/Home'}}/>
    )
  )} />
)*/

export default class App extends React.Component {
  render() {
    return (
      <MyProvider>     
        <Router>
          <div>
            <Switch>
              <Route path='/' exact component={HomePage} />
              <Route path='/RegForm' component={RegForm} />
              <Route path='/AdminPanel' component={AdminPanel} />
              <Route path='/SurveyOverview' component={SurveyOverview} />
              <Route path='/CreateSurvey' component={CreateSurvey} />
              <Route path='/NewAnchors' component={NewAnchors} />
              <Route path='/NewStatements' component={NewStatements} />
              <Route path='/PrivacyScreen' component={PrivacyScreen} />
              <Route path='/Reject' component={Reject} />
              <Route path='/Debrief' component={Debrief} />
            </Switch>
          </div>
        </Router>
      </MyProvider>
    );
  }
}

const HomePage = () => (
  <div>
    <Home />
  </div>
);

/*
1. Admin uses CreateSurvey_1 page
to start the survey creation process
then moves to the next page
CreateAnchors which
then moves to StatementCreator page
https://soc-web-liv-60.napier.ac.uk/API/public/api/admin/addResearch
*/