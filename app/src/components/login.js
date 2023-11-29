import React from 'react'
import '../css/login.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'
function Login() {
    const [errorMessage,setErrorMessage] = useState('')
	const [cookies,setCookie] = useCookies(['token'])
	const navigate = useNavigate()
    const loginUser = async() =>{
		
		let email=document.getElementById('email').value
		let password=document.getElementById('password').value

		if(email === ''){
			setErrorMessage('Email cannot be empty')
		}
		else if(password === ''){
			setErrorMessage('password cannot be empty')
		}
		else if(password.length<8){
			setErrorMessage('password cannot be less than 8 characters')
		}
		else{
			fetch('http://127.0.0.1:3001/users/login',{
				method:'POST',
				body:JSON.stringify({
					email,
					password
				}),
				headers:{
					'Content-Type':'application/json'
				}
			}).then(response => response.json())
			.then(data => {
				setCookie('token',data.token)
				navigate('/')

			})
			.catch(()=>setErrorMessage('Email and password doesnt match'))
        }
    }
    const renderError=()=>{
		if(errorMessage!==''){
			return(<div className="error">
			<p>{errorMessage}</p>
		</div>)
		}
		return
	}
  return (
    <div className='login'>
        <h1>Login</h1>
        {renderError()}
        <div className='login-form'>
            <input type='email' placeholder='email' className='input' id='email'/><br/>
            <input type='password' placeholder='password' className='input' id='password'/><br/>
            <button className='save' onClick={loginUser}>login</button><br/>
            <p className='link'>I am a new user, <a href='/register' >register.</a></p>
        </div>
    </div>
  )
}

export default Login
