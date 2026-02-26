import React, { useEffect } from 'react'
import Foods from '../components/Foods'
import DynamicBg from '../components/DynamicBg'
const Menu = () => {

  useEffect(()=>{
      window.scrollTo(0,0);
    },[])

  return (
    <div>
      <DynamicBg title={"Menu"} />
      <Foods/>
    </div>
  )
}

export default Menu