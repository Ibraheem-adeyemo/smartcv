import { useState } from "react";
import { Redirect } from "react-router-dom";
import "../../css/organization.css";

const OrganizationId = (props) =>
{

    const [redirect,setRedirect] = useState(false);

    const handleSubmit = ()=>
    {
        setRedirect(true);
    }

    if(redirect === true)
    {
        return <Redirect to="/paas/register/create/bank"></Redirect>
    }
    return (
        <form className="form" onSubmit={handleSubmit}>
            <p className="registerHeader">Register</p>
            <div className="frameId">
                <label className="label">Organization id</label>
                <input className="input" type="text" name="orgId" required />
                
                <div className="submit" onClick={handleSubmit}>
                    Submit
                </div>

            </div>

        </form>
    
    );

}

export default OrganizationId;