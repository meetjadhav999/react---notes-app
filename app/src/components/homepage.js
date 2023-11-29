import React, { useState,useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import '../css/homepage.css'
export default function HomePage() {
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()
  const [data,setData] = useState([])
  useEffect(()=>{
    fetch('http://127.0.0.1:3001/api/note',{
      method:'GET',
      headers:{
        'Authorization':`Bearer ${cookies.token}`
      }
    }).then(response => response.json())
    .then(data => setData(data))
    .catch(()=>{
      navigate('/login')
    })
  })

  const deleteNote = (noteId) =>{
    fetch('http://127.0.0.1:3001/api/note/'+noteId,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${cookies.token}`
      }
    })
  }

  return (
    <div>
      {data.map((note)=>(<div key={note._id} className='note'>
        <h4>{note.title}</h4>
        <p>{note.text}</p>
        <button onClick={()=> deleteNote(note._id)} className='deleteNote'>Delete</button>
      </div>
        
      ))}

      
    </div>
  )
}
