import "../css/createBank.css";
import TopHeader from "./common/TopHeader";
const CreateBankPage = ()=>
{
    return(<div className="mainbody">
        <TopHeader></TopHeader>

        <div className="flow">
            <div>
                <p>Create bank</p>
                <p>Provide bank information and validation code</p>
            </div>
            <div>
                <p>Create Super Admin</p>
                <p>Enter super admin information and create user</p>
            </div>
            <div>
                <p>Institution colors</p>
                <p>Select the colour scheme for the institution</p>
            </div>

        </div>

        <form className="formBank">
           <h3>Create bank</h3>
        </form>

    </div>);

}

export default CreateBankPage;