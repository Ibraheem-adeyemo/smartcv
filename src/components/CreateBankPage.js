import "../css/createBank.css";
import RegisterThumbNails from "./common/RegisterThumbNails";
import TopHeader from "./common/TopHeader";
import CreateBankForm from "./common/CreateBankForm";
const CreateBankPage = () => {
  return (
    <div className="mainbody">
      <TopHeader></TopHeader>
      <RegisterThumbNails
        one="tnCircleActive"
        headerOne="tnHeaderActive"
        two="tnCircleNoFocus"
        headerTwo="tnHeaderNoFocus"
        three="tnCircleNoFocus"
        headerThree="tnHeaderNoFocus"
        lines="hidden"
      ></RegisterThumbNails>

      <CreateBankForm></CreateBankForm>
    </div>
  );
};

export default CreateBankPage;
