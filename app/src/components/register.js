import React from "react";
import "../css/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'
function Register() {
	const [errorMessage,setErrorMessage] = useState('')
	const [cookies,setCookie] = useCookies(['token'])
	const navigate = useNavigate()

	const registerUser = async() =>{
		
		let name=document.getElementById('name').value
		let email=document.getElementById('email').value
		let password=document.getElementById('password').value
		let cpassword = document.getElementById('cpassword').value

		
		if(name === '' || name.length<3){
			setErrorMessage('Username cannot be empty or less than 3 letters')
		}
		else if(email === ''){
			setErrorMessage('Email cannot be empty')
		}
		else if(password === ''){
			setErrorMessage('password cannot be empty')
		}
		else if(password.length<8){
			setErrorMessage('password cannot be less than 8 characters')
		}
		else if(password === cpassword){
			fetch('http://127.0.0.1:3001/users',{
				method:'POST',
				body:JSON.stringify({
					name,
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
			.catch(()=>setErrorMessage('Email is already taken'))
		}
		else{
			setErrorMessage("Password doesn't match")
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
    <div className="login">
      <h1>Sign up</h1>
	  {renderError()}
	  
      <div className="login-form">
        <input type="text" placeholder="Name" className="input" id="name" required/>
        <input type="email" placeholder="Email" className="input" id="email" required/>
        <input type="password" placeholder="Password" className="input" id="password" required/>
        <input
          type="password"
          placeholder="Confirm password"
          className="input"
		  id="cpassword"
		  required
        />
        <button className="save" onClick={registerUser}>Sign up</button>
        <p className="link">
          I already have account, <a href="/login">login.</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
