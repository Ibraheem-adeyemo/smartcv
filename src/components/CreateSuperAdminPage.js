import TopHeader from "./common/TopHeader";
import "../css/createBank.css";
import RegisterThumbNails from "./common/RegisterThumbNails";

const CreateSuperAdminPage = () => {
  return (
    <div className="mainbody">
      <TopHeader></TopHeader>
      <RegisterThumbNails
        one="tnCircleActive"
        headerOne="tnHeaderActive"
        two="tnCircleFocus"
        headerTwo="tnHeaderFocus"
        three="tnCircleNoFocus"
        headerThree="tnHeaderNoFocus"
      ></RegisterThumbNails>
    </div>
  );
};

export default CreateSuperAdminPage;
