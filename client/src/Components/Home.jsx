import React from 'react'
import SideBar1 from './SideBar1'
import MiddleComponent from './MiddleComponent'

const Home = (props) => {
  return (
    <>
    <MiddleComponent currentPlaylistSong={props.currentPlaylistSong} setCurrentPlaylistSong={props.setCurrentPlaylistSong}/>
    </>
  )
}

export default Home;