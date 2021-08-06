import "../css/common.css";
import MissionStatement from "./common/MissionStatement";
import RequestResetPassword from "./common/RequestResetPassword";

const RequestResetPasswordPage = (props)=>
{
   return (
   <div className="container">
      <MissionStatement></MissionStatement>
      <RequestResetPassword></RequestResetPassword>
   </div>
   );
}

export default RequestResetPasswordPage;