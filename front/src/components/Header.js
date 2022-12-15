import "./Header.css"
import icon from "../imgs/icon.png"
import foot from "../imgs/Foot.png"
import webname from "../imgs/webname.png"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

function Header(){

    return(
        <div>
            <div className="BigSection">
                <Link to="/"><img src={icon} className="webIcon"/><img src={webname} className="webname"/></Link>
                <Link to="/login"><div className="login">Login</div></Link>
                <Link to="/login"><img src={foot} className="foot" style={{width:"22px",height:"22px"}}></img></Link>
            </div>
            <div className="line"></div>
        </div>
    )
}


export default Header;