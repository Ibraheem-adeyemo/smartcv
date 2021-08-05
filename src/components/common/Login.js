import "../../css/login.css";

const Login = (props) => {
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
          <input type="password" placeholder="password" />
        </div>
      </div>

      <div className="frame3">
        <div className="button">
          <p className="buttonText">Login</p>
        </div>
        <a>Forgot your password?</a>
      </div>
    </form>
  );
};

export default Login;
