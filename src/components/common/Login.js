import "../../css/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
  const eye = <FontAwesomeIcon icon={faEye} />;

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(showPassword ? false : true);
  };
  return (
    <form className="formcontainer">
      <label className="header">Login</label>

      <div className="frame2">
        <div className="group">
          <label>Email Address</label>
          <input type="email" placeholder="youremail@domain.com" />
        </div>
        <div className="group">
          <label>Password</label>
          <div className="passwordEye">
            
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
            />
            <i onClick={togglePassword}>{eye}</i>
          </div>
        </div>
      </div>

      <div className="frame3">
        <div className="button">
          <p className="buttonText">Login</p>
        </div>
        <Link to="/paas/auth/forgotpassword">Forgot your password?</Link>
      </div>
    </form>
  );
};

export default Login;
