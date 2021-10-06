import { useState } from "react";
import { Redirect } from "react-router-dom";
import file from "../../images/file.png";

const CreateBankForm = () => {

    const [redirect,setRedirect] = useState(false);

    const handleSubmit = ()=>
    {
        setRedirect(true);
    }

    if(redirect === true)
    {
        return <Redirect to="/paas/register/create/superadmin"></Redirect>
    }

  return (
    <form className="formBank" onSubmit={handleSubmit}>
      <div>
        <p className="formHeader">Create bank</p>
        <p className="formBankText">Enter bank details</p>
      </div>

      <div className="formSection">
        <div className="formSingleSection">
          <label>Bank Name</label>
          <input type="text" name="bankName" placeholder="Enter bank name" />
        </div>
        <div className="formSingleSection">
          <label>Bank ID</label>
          <input type="text" name="bankID" placeholder="Enter bank ID" />
        </div>
      </div>

      <div className="formSection">
        <div className="formSingleSection">
          <label>Bank Branch</label>
          <input type="text" name="bankBranch" placeholder="Head office" />
        </div>
        <div className="formSingleSection">
          <label>Bank Location</label>
          <input type="text" name="bankLoc" placeholder="Enter bank Location" />
        </div>
      </div>

      <div className="formSection">
        <div className="formSingleSection">
          <label>Bank Address</label>
          <input
            style={{ width: "138vh" }}
            type="text"
            name="bankAddress"
            placeholder="Enter bank address"
          />
        </div>
      </div>

      <div>
        <p className="fileHeader">Upload a bank logo</p>
        <div className="fileZone">
          <img src={file} alt="file logo" />
          <div>
            <input id="file" className="fileInput" type="file" />
            <label for="file">Browse file</label>
            <p className="fileFormat">File Format:JPG,JPEG,PNG</p>
          </div>
        </div>
      </div>

      <div className="buttonZone">
        <div className="cancelButton">Cancel</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <div className="nextButton" onClick={handleSubmit}>Next</div>
      </div>
    </form>
  );
};

export default CreateBankForm;
