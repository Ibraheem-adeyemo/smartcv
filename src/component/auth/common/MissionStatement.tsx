import { MotionBox, MotionFlex, MotionImage } from '../../framer';
import { cookieKeys, cookiesTimeout, Images, links } from "../../../constants";

const MissionStatement = (props: any) => {
  return (
    <div>
      <div className="logoContainer">
        <MotionImage src={Images.iswLogo} alt="Interswitch logo" />
      </div>

      <div className="textContainer">
        <p className="topBanner">
          Built to help you enhance your <br />
          service delivery in the following
          <br />
          areas
        </p>

        <div className="bulletContainer">
          <MotionImage src={Images.bullet} alt="good sign" />

          <div className="messageContainer">
            <p className="bulletHeader">ATM & Transaction monitoring</p>
            <p className="bulletMessage">
              Set-up new terminals,send downloads to disconnected <br />
              terminals, realtime transaction monitoring, monitor <br />
              online/offline/supervisor mode terminals
            </p>
          </div>
        </div>

        <div className="bulletContainer">
        <MotionImage src={Images.bullet} alt="good sign" />

          <div className="messageContainer">
            <p className="bulletHeader">Card operation</p>
            <p className="bulletMessage">
              Card production, card management functions like
              <br />
              Block/Unblock card, PIN reset, card limits, card and <br />
              account info
            </p>
          </div>
        </div>

        <div className="bulletContainer">
        <MotionImage src={Images.bullet} alt="good sign" />

          <div className="messageContainer">
            <p className="bulletHeader">Best in class support</p>
            <p className="bulletMessage">
              We are positioned as an industry expert with a<br />
              dedicated request for all your needs and support <br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionStatement;