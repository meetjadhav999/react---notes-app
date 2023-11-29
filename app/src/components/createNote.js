import React, { useEffect, useState } from 'react'
import '../css/createnote.css'
import {useNavigate} from 'react-router-dom'
import { useCookies } from 'react-cookie'
function CreateNote() {

  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()

  const [title,setTitle] = useState('')
  const [text,setText] = useState('')

  useEffect(()=>{
    if(cookies.token){
      return
    }
    navigate('/register')
  })


  const goToHome = () =>{
    navigate('/')
  }

  const handleTitle = (e) =>{
    setTitle(e.target.value)
  }
  const handleText = (e) =>{
    setText(e.target.value)
  }
  const [errorMessage,setErrorMessage] = useState('')
  const saveNote = async() =>{
    fetch('http://127.0.0.1:3001/api/note',{
      method:'POST',
      body:JSON.stringify({
        title,
        text
      }),
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${cookies.token}`
      }
    }).then(response => {
      if(response.status === 201){
        navigate('/')
      }
      else setErrorMessage('Title is required')
    })
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
    <div className='createnote'>
      <div className='createnote-container'>
      {renderError()}

        <input type='text' placeholder='Title' className='title-input' id='title' onChange={handleTitle}/>
        <hr/>
        <textarea placeholder='type your note here...' className='text-input' id='text'onChange={handleText}/>
        <button className='cancel' onClick={goToHome} >Cancel</button>
        <button className="save" onClick={saveNote}>Save</button>
      
      </div>
    </div>
  )
}

export default CreateNote
