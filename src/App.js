
import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RequestResetPasswordPage from './components/RequestResetPasswordPage';

function App() {
  return (
    <Switch>
       <Route path="/" exact component={LoginPage}></Route>
       <Route path="/paas/auth/forgotpassword" component={RequestResetPasswordPage}></Route>
    </Switch>
  );
}

export default App;
