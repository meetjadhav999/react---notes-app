import React from 'react'
import '../css/navbar.css'
function Navbar() {

  const toggleMenu = () =>{
    let menu = document.getElementById('sidemenu')
    if(menu.style.width === "100vw"){
      menu.style.width = "0px"
    }
    else{
      menu.style.width = "100vw"
    }
  }

  return (
    <div className='navbar'>
      <div className="menu-btn" onClick={toggleMenu}>
        <div className='bar' id='bar1'></div>
        <div className='bar' id='bar2'></div>
        <div className='bar' id='bar3'></div>
      </div>
      <div className='logo'>
        My Notes
      </div>
      <div></div>
    </div>
  )
}

export default Navbar
