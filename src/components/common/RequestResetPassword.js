import "../../css/requestResetPassword.css";
import {Link} from 'react-router-dom';
const RequestResetPassword = (props) => {
  return (
    <form className="formcontainer">
      <div>
        <label className="header">Reset Password</label>
        <label className="captionText">
          We'll send a password reset link to this email
        </label>
      </div>

      <div className="group">
        <label>Email Address</label>
        <input type="email" placeholder="youremail@domain.com" />
      </div>

      <div className="frame3">
        <div className="button">
          <p className="buttonText">Login</p>
        </div>
        <Link to="/">Back to Login</Link>
      </div>
    </form>
  );
};

export default RequestResetPassword;
