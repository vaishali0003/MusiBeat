import React from 'react'
import MiddleComponent from './Components/MiddleComponent'
import SideBar from './Components/SideBar'

const App = () => {
  return (
    <>
     <div className="main">
      <div className="components">
      <SideBar/>
      <MiddleComponent/>
      </div>
    </div>
    </>
  )
}

export default App