import "../css/createBank.css";
import RegisterThumbNails from "./common/RegisterThumbNails";
import TopHeader from "./common/TopHeader";
const CreateBankColor = ()=>
{
    return (
        <div className="mainbody">
          <TopHeader></TopHeader>
          <RegisterThumbNails
            one="tnCircleActive"
            headerOne="tnHeaderActive"
            two="tnCircleActive"
            headerTwo="tnHeaderActive"
            three="tnCircleFocus"
            headerThree="tnHeaderFocus"
          ></RegisterThumbNails>
    
        </div>
      );
}

export default CreateBankColor;