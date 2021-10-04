
import './App.css';
import {Switch,Route} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import OrganizationIdPage from './components/OrganizationIdPage';
import DashboardLinks from './components/common/DashboardLinks';
import AuthenticatedRoute from './components/common/AuthenticatedRoute';


function App() {
  return (
    <Switch>
       <Route path="/" exact component={LoginPage}></Route>
       <Route path="/paas/register/organization" component={OrganizationIdPage}></Route>
       <AuthenticatedRoute path="/paas/dashboard" component={DashboardLinks}></AuthenticatedRoute>
       
    </Switch>
  );
}

export default App;
