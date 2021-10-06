const RegisterThumbNails = (props) => {
  return (
    <div className="flow">
      <div>
        <p className={props.one}>1</p>
        <p className={props.headerOne}>Create bank</p>
        <p className="tnText">
          Provide bank information <br /> and validation code
        </p>
      </div>
      <div className="line" style={{visibility:props.lines}}>
        <hr />
      </div>
      <div>
        <p className={props.two}>2</p>
        <p className={props.headerTwo}>Create Super Admin</p>
        <p className="tnText">
          Enter super admin <br />
          information and create user
        </p>
      </div>
      <div className="line" style={{visibility:props.lines}}>
        <hr />
      </div>
      <div>
        <p className={props.three}>3</p>
        <p className={props.headerThree}>Institution colors</p>
        <p className="tnText">
          Select the colour scheme <br /> for the institution
        </p>
      </div>
    </div>
  );
};

export default RegisterThumbNails;
