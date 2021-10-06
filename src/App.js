
import './App.css';
import {Switch,Route} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import OrganizationIdPage from './components/OrganizationIdPage';
import AuthenticatedRoute from './components/common/AuthenticatedRoute';
import DashboardPage from './components/DashboardPage';
import CreateBankPage from './components/CreateBankPage';
import CreateSuperAdminPage from './components/CreateSuperAdminPage';
import CreateBankColor from './components/CreateBankColor';


function App() {
  return (
    <Switch>
       <Route path="/" exact component={LoginPage}></Route>
       <Route path="/paas/register/organization" component={OrganizationIdPage}></Route>
       <Route path="/paas/register/create/bank" component={CreateBankPage}></Route>
       <Route path="/paas/register/create/superadmin" component={CreateSuperAdminPage}></Route>
       <Route path="/paas/register/create/bankcolor" component={CreateBankColor}></Route>
       <AuthenticatedRoute path="/paas/dashboard" component={DashboardPage}></AuthenticatedRoute>
       
    </Switch>
  );
}

export default App;
