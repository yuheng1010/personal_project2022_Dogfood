import "./Header.css"
import icon from "../imgs/icon.png"
import foot from "../imgs/Foot.png"
import webname from "../imgs/webname.png"
import filter from "../imgs/filter.png"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'


function Header() {
    let token = ''
    if (localStorage.getItem('token')) {
        token = localStorage.getItem('token')
    }
    let selectorArr=[]
    const [arr,setArr] = useState([])
    const [url,setUrl] = useState('')
    
    useEffect(() => {
        setArr([])
        document.querySelector("button").style.backgroundColor="rgb(181, 211, 204)"
        if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== 'undefined') {
            document.querySelector(".login").style.display = "none";
            document.querySelector(".logOut").style.display = "block";
        } else {
            document.querySelector(".login").style.display = "block";
            document.querySelector(".logOut").style.display = "none";
        }
    }, [])
    function logOut() {
        localStorage.removeItem('token');
        window.location.reload();
    }
    function selector(e){
        let selectorStr="";
        if(arr.includes(e) === true){
            document.getElementById(e).style.backgroundColor="rgb(181, 211, 204)"
            arr.splice(arr.indexOf(e),1)
        }else{
            document.getElementById(e).style.backgroundColor="#c9f4df"
            arr.push(e)
            setArr(arr)
        }
        // console.log(selectorArr)
        for(var i=0;i<arr.length;i++){
            if(i!==arr.length-1){
                 selectorStr+=arr[i]+"+"
            }else{
                selectorStr+=arr[i]
            }
        }
        // console.log(selectorStr)
        setUrl(selectorStr)

    }
    console.log(url)
    return (
        <nav className="nav-box">
            <div className="BigSection">
                <Link to="/"><img src={icon} className="webIcon" /><img src={webname} className="webname" /></Link>
                {/* <img src={filter} id="filter" tabindex="0" /> */}
                <Link to="/login"><div className="login">Login</div></Link>
                <a href="#" className="logOut" style={{ display: "none" }} onClick={logOut}>LogOut</a>
                <Link to="/login"><img src={foot} className="foot" style={{ width: "22px", height: "22px" }}></img></Link>

                <input type="checkbox" id="menu" />
                <label for="menu" className="line">
                    <div className="menu"></div>
                </label>
                <div className="menu-list">
                    <ul>
                        <li><div className="filterOption">
                            <button className="selectBtn" id="幼犬" onClick={()=>selector("幼犬")}>幼年</button>
                            <button className="selectBtn" id="成" onClick={()=>selector("成")}>成年</button>
                            <button className="selectBtn" id="高齡" onClick={()=>selector("高齡")}>老年</button>
                        </div></li>
                        <li><div className="filterOption2">
                            <div className="Option2_1">
                            <button className="selectBtn" id="羊" onClick={()=>selector("羊")}>羊</button>
                            <button className="selectBtn" id="牛" onClick={()=>selector("牛")}>牛</button>
                            <button className="selectBtn" id="魚" onClick={()=>selector("魚")}>魚</button>
                            </div>
                            <div className="Option2_1">
                            <button className="selectBtn" id="豬" onClick={()=>selector("豬")}>豬</button>
                            <button className="selectBtn" id="雞" onClick={()=>selector("雞")}>雞</button>
                            <button className="selectBtn" id="鹿" onClick={()=>selector("鹿")}>鹿</button>
                            </div>
                        </div></li>
                        <li><div className="filterOption3">
                        <div className="Option2_2">
                            <button className="selectBtn" id="脂" onClick={()=>selector("脂")}>低脂</button>
                            <button className="selectBtn" id="無穀" onClick={()=>selector("無穀")}>無穀</button></div><div className="Option2_2">
                            <button className="selectBtn" id="挑嘴" onClick={()=>selector("挑嘴")}>挑食</button>
                            <button className="selectBtn" id="低GI" onClick={()=>selector("低GI")}>低GI</button>
                            </div>
                            <div className="Option2_3">
                            <button className="selectBtn" id="過敏" onClick={()=>selector("過敏")}>抗過敏</button>
                            <button className="selectBtn" id="腸" onClick={()=>selector("腸")}>腸胃保健</button></div><div className="Option2_3">
                            <button className="selectBtn" id="骨" onClick={()=>selector("骨")}>骨頭關節</button>
                            <button className="selectBtn" id="皮膚" onClick={()=>selector("皮膚")}>皮毛保養</button></div>
                        </div></li>
                        <Link to={`/filter/${url}`}><li><img src={filter} id="filter" tabindex="0" /></li></Link>
                    </ul>
                </div>
            </div>
            <div className="line1"></div>

        </nav>
    )
}


export default Header;