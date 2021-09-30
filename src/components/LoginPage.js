import "../css/common.css";
import Login from "./common/Login";
import MissionStatement from "./common/MissionStatement";

const LoginPage = (props) => {
  return (
    <div className="container">
      <MissionStatement></MissionStatement>
      <Login location={props.location}></Login>
    </div>
  );
};

export default LoginPage;
