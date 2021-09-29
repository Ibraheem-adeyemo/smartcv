
import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RequestResetPasswordPage from './components/RequestResetPasswordPage';
import DashboardLinks from './components/common/DashboardLinks';
import AuthenticatedRoute from './components/common/AuthenticatedRoute';


function App() {
  return (
    <Switch>
       <Route path="/" exact component={LoginPage}></Route>
       <AuthenticatedRoute path="/paas/dashboard" component={DashboardLinks}></AuthenticatedRoute>
    </Switch>
  );
}

export default App;
