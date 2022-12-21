import React, { useEffect, useState } from 'react'
import './Login.css'

function signUp(){
    const userName = document.getElementById('userName').value
    const ac = document.getElementById('emailSU').value
    const pa = document.getElementById('passwordSU').value
    const phone = document.getElementById('phone').value
    const dogName = document.getElementById('dogName').value
    const dogVar = document.getElementById('dogVar').value
    const dogAge = document.getElementById('dogAge').value

    console.log(userName)
    console.log(ac)
    console.log(pa)
    console.log(phone)
    console.log(dogName)
    console.log(dogAge)
    console.log(dogVar)
    var header = { 'Content-Type': 'application/json; charset=UTF-8' };
    fetch('http://localhost:7000/api/v1/signUp', {
                method: 'POST',
                headers: header,
                body: JSON.stringify({ 'userName':userName,'email': ac, 'password':pa,'phone':phone,'dogName':dogName,'dogAge':dogAge,'dogVar':dogVar})
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    console.log(result);
                    alert(result.msg)
                   
                })
    
}

function signIn(){
    const ac = document.getElementById('email').value
    const pa = document.getElementById('password').value
    console.log(ac)
    console.log(pa)
    var header = { 'Content-Type': 'application/json; charset=UTF-8' };
    fetch('http://localhost:7000/api/v1/signIn', {
                    method: 'POST',
                    headers: header,
                    body: JSON.stringify({ 'email': ac, 'password':pa})
                })
                    .then(res => {
                        return res.json();
                    }).then(result => {
                        console.log(result);
                        localStorage.setItem('token',result.token) 
                        alert(result.message)
                        window.location.assign("http://localhost:4000")
                    });
}



function Login() {
    useEffect(() => {
        console.clear();
        const loginBtn = document.getElementById('login');
        const signupBtn = document.getElementById('signup');

        loginBtn.addEventListener('click', (e) => {
            let parent = e.target.parentNode.parentNode;
            Array.from(e.target.parentNode.parentNode.classList).find((element) => {
                if (element !== "slide-up") {
                    parent.classList.add('slide-up')
                } else {
                    signupBtn.parentNode.classList.add('slide-up')
                    parent.classList.remove('slide-up')
                }
            });
        });

        signupBtn.addEventListener('click', (e) => {
            let parent = e.target.parentNode;
            Array.from(e.target.parentNode.classList).find((element) => {
                if (element !== "slide-up") {
                    parent.classList.add('slide-up')
                } else {
                    loginBtn.parentNode.parentNode.classList.add('slide-up')
                    parent.classList.remove('slide-up')
                }
            });
        });
    }, [])
    useEffect(()=>{
    //     if(localStorage.getItem('token')!==null && localStorage.getItem('token')!=='undefined'){
    //         alert('已登入狀態!')
    //         window.location.assign('http://localhost:4000')
    //     }
    },[])
    return (

        <div className='LoginSection'>
            <div className="form-structor">
                <div className="signup">
                    <h2 className="form-title" id="signup"><span>or</span>Log in</h2>
                    <div className="form-holder">

                        <input type="text" className="input" id="email" placeholder="Email" />
                        <input type="password" className="input" id="password" placeholder="Password" />
                    </div>
                    <button className="submit-btn" onClick={signIn}>Log in</button>
                </div>
                <div className="login slide-up">
                    <div className="center">
                        <h2 className="form-title" id="login"><span>or</span>Sign up</h2>
                        <div className="form-holder">
                            <input type="text" className="input" id="userName" placeholder="User's name" />
                            <input type="text" className="input" id="emailSU" placeholder="Email" />
                            <input type="password" className="input" id="passwordSU" placeholder="Password" />
                            <input type="text" className="input" id="phone" placeholder="phone" />
                            <input type="text" className="input" id="dogName" placeholder="Dog's name" />
                            <input type="text" className="input" id="dogAge" placeholder="Dog's age" />
                            <select className='dogVar' id="dogVar" placeholder="Dog's size">
                                <option select hidden>Dog's size</option>
                                <option>Large-sized</option>
                                <option>Medium-sized</option>
                                <option>Small-sized</option>
                            </select>
                        </div>


                        <button className="submit-btn" onClick={signUp}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login