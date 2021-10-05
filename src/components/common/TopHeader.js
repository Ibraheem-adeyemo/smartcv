import logo from '../../images/IntBlue.png';
const TopHeader = () => {
    return (<div className="topNav">
           <img src={logo}/>
           <div className="helloText">Hello, prospective user</div>
    </div>);

}

export default TopHeader;