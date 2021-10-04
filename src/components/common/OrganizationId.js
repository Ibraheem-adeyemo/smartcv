import "../../css/organization.css";

const OrganizationId = (props) =>
{
    return (
        <form className="form">
            <p className="registerHeader">Register</p>
            <div className="frameId">
                <label className="label">Organization id</label>
                <input className="input" type="text" name="orgId" />
                
                <div className="submit">
                    Submit
                </div>

            </div>

        </form>
    
    );

}

export default OrganizationId;