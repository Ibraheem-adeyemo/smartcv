import "../css/common.css";
import MissionStatement from "./common/MissionStatement";
import OrganizationId from "./common/OrganizationId";


const OrganizationIdPage = (props)=>
{
   return (
   <div className="container">
      <MissionStatement></MissionStatement>
      <OrganizationId></OrganizationId>
   </div>
   );
}

export default OrganizationIdPage;