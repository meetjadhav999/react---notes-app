import React from 'react'
import '../css/sidemenu.css'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
function SideMenu() {
  const navigate = useNavigate()
  const [cookie,setCookie,removeCookie] = useCookies(['token'])
  const toggleMenu = () =>{
    let menu = document.getElementById('sidemenu')
    if(menu.style.width === "100vw"){
      menu.style.width = "0px"
    }
    else{
      menu.style.width = "100vw"
    }
  }

  const userLogout = () =>{
    removeCookie('token')
    toggleMenu()
  }
  const gotToCreateNote = ()=>{
    navigate('/createnote')
    toggleMenu()
  }
  const gotoHome = () =>{
    navigate('/')
    toggleMenu()
  }

  return (
    <div className='sidemenu' id='sidemenu'>
      <div className='menu'>
        <div className='menu-component'>
            <div className='close'>
                <div className='close-btn' onClick={toggleMenu}>
                    <div className='bar crossed1'></div>
                    <div className='bar crossed2'></div>
                </div>
                
                
            </div>
        </div>
        <div className='menu-component'>
          <button onClick={gotoHome}>Home</button>
        </div>
        <div className='menu-component'>
            <button onClick={userLogout}>Log Out</button>
        </div>
        <div className='menu-component'>
            <button onClick={gotToCreateNote}>Create Note</button>
        </div>
      </div>
      <div className='black-background' onClick={toggleMenu}>

      </div>
    </div>
  )
}

export default SideMenu
