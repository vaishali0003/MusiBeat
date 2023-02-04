import React from 'react'
import SideBar1 from './SideBar1'
import MiddleComponent from './MiddleComponent'

const Home = (props) => {
  return (
    <div className="components">
    <SideBar1/>
    <MiddleComponent appFavList={props.appFavList} setAppFavList={props.setAppFavList}/>
    </div>
  )
}

export default Home