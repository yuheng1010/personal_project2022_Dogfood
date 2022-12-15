import React, { useEffect, useState } from 'react'
import './Login.css'


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
    return (

        <div className='LoginSection'>
            <div className="form-structor">
                <div className="signup">
                    <h2 className="form-title" id="signup"><span>or</span>Log in</h2>
                    <div className="form-holder">

                        <input type="email" className="input" placeholder="Email" />
                        <input type="password" className="input" placeholder="Password" />
                    </div>
                    <button className="submit-btn">Log in</button>
                </div>
                <div className="login slide-up">
                    <div className="center">
                        <h2 className="form-title" id="login"><span>or</span>Sign up</h2>
                        <div className="form-holder">
                            <input type="text" className="input" placeholder="User's name" />
                            <input type="email" className="input" placeholder="Email" />
                            <input type="password" className="input" placeholder="Password" />
                            <input type="text" className="input" placeholder="phone" />
                            <input type="text" className="input" placeholder="Dog's name" />
                            <input type="text" className="input" placeholder="Dog's age" />
                            <select className='dogVar' placeholder="Dog's size">
                                <option select hidden>Dog's size</option>
                                <option>Large-sized</option>
                                <option>Medium-sized</option>
                                <option>Small-sized</option>
                            </select>
                        </div>


                        <button className="submit-btn">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login