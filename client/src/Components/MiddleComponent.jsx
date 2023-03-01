import React from 'react'
import { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Context from '../context/songs/Context';
import { useContext } from 'react';
import SplideComponent from './SplideComponent';
import AudioPlayerComp from './AudioPlayerComp';
import CreatePlaylist from './CreatePlaylist';

const MiddleComponent = (props) => {
  const songInitial = [];
  const [songarr, setsongarr] = useState(songInitial)
  const [cat, setcat] = useState("")
  const [audiourl, setaudiourl] = useState("")
  const [pauseState, setpauseState] = useState("");
  const [playState, setplayState] = useState("");

  const context = useContext(Context);
  const { getallsongs } = context;

  const setallsong = async () => {
    const getalldata = await getallsongs('','');
    setsongarr(getalldata);
  };

  useEffect(() => {
    setallsong();
  }, []);

  const getpauseplay = (pause, play) => {
    setpauseState(pause);
    setplayState(play);
  };

  return (
    <>
      <div className="middle1">
        <SplideComponent songarr={songarr} setsongarr={setsongarr} cat="popular" setaudiourl={setaudiourl} pauseState={pauseState} playState={playState} currentPlaylistSong={props.currentPlaylistSong} setCurrentPlaylistSong={props.setCurrentPlaylistSong}/>
        <SplideComponent songarr={songarr} setsongarr={setsongarr} cat="dance" setaudiourl={setaudiourl} pauseState={pauseState} playState={playState} currentPlaylistSong={props.currentPlaylistSong} setCurrentPlaylistSong={props.setCurrentPlaylistSong}/>
        <SplideComponent songarr={songarr} setsongarr={setsongarr} cat="chill" setaudiourl={setaudiourl} pauseState={pauseState} playState={playState} currentPlaylistSong={props.currentPlaylistSong} setCurrentPlaylistSong={props.setCurrentPlaylistSong}/>
        <SplideComponent songarr={songarr} setsongarr={setsongarr} cat="sad" setaudiourl={setaudiourl} pauseState={pauseState} playState={playState} currentPlaylistSong={props.currentPlaylistSong} setCurrentPlaylistSong={props.setCurrentPlaylistSong}/>
        <SplideComponent songarr={songarr} setsongarr={setsongarr} cat="workout" setaudiourl={setaudiourl} pauseState={pauseState} playState={playState} currentPlaylistSong={props.currentPlaylistSong} setCurrentPlaylistSong={props.setCurrentPlaylistSong}/>
        {/* <SplideComponent songarr={songarr} setsongarr={setsongarr} cat="retro" setaudiourl={setaudiourl} pauseState={pauseState} playState={playState} currentPlaylistSong={props.currentPlaylistSong} setCurrentPlaylistSong={props.setCurrentPlaylistSong}/> */}
        <SplideComponent songarr={songarr} setsongarr={setsongarr} cat="retro" setaudiourl={setaudiourl} pauseState={pauseState} playState={playState} currentPlaylistSong={props.currentPlaylistSong} setCurrentPlaylistSong={props.setCurrentPlaylistSong}/>
        {/* <div className="popular_hits">
          <h4 className="song_cat_txt">Workout Vibes</h4>
        </div>

        <div className="popular_hits">
          <h4 className="song_cat_txt">Let's Go Back</h4>
        </div>

        <div className="popular_hits">
          <h4 className="song_cat_txt">Recommended for today</h4>
        </div> */}

        <AudioPlayerComp audiourl={audiourl} getpauseplay={getpauseplay} />
      </div>
    </>
  )
}

export default MiddleComponent