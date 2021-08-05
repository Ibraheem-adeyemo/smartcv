import "../css/loginPage.css";
import Login from "./common/Login";
import MissionStatement from "./common/MissionStatement";

const LoginPage = () => {
  return (
    <div className="container">
      <MissionStatement></MissionStatement>
      <Login></Login>
    </div>
  );
};

export default LoginPage;
