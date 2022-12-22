import './App.css';
import Header from "./components/Header"
import HomePage from './components/HomePage';
import Detail from "./components/Detail"
import Filter from './components/Filter';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Login from './components/Login';
import React, { useEffect, useState } from 'react'
import dogProfile from "./imgs/dogProfile.png"
import afoot from "./imgs/afoot.png"

function App() {
  const [data,setData] = useState([])
  useEffect(() => {
    document.getElementById("notFound").style.display="none";
    if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== 'undefined') {
      document.querySelector(".profile").style.display = "block";
      fetch("http://localhost:7000/api/v1/userDetail",{
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
        method: 'POST',
      })
      .then(res => res.json())
      .then(data => {
          setData(data)
      })
    } else {
      document.querySelector(".profile").style.display = "none";
    }

  }, [])
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/filter/:constraint" element={<Filter />} />
      </Routes>

      <nav><div className='profile' style={{ display: "none" }}>
        <img className="dogPho" src={dogProfile} />
        <div className='profileDetail'>
            <font>User name :{data.userName}</font>
            <font>Dog name : {data.dogName}</font>
            <font>Dog breed : {data.dogVar} </font>
            <font>Dog age : {data.dogAge}</font>
            <br/>
            <font style={{fontWeight:"bold"}}><img className="afoot" src={afoot}/>珍藏</font>
        </div>
      </div></nav>
<div className='footer'></div>
    </div>
  );
}

export default App;
