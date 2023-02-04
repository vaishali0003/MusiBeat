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
    const getalldata = await getallsongs('', '')
    setsongarr(getalldata);
  };

  useEffect(() => {
    setallsong();
  }, []);

  const getpauseplay = (pause, play) => {
    setpauseState(pause);
    setplayState(play);
    // console.log(pauseState, playState);
  };

  return (
    <>
      <div className="middle1">

        <div className="login_logout">
          <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
          <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
              </li>
            </ul>
          </div>
        </div>
        
        <CreatePlaylist />
        <SplideComponent songarr={songarr} setsongarr={setsongarr} cat="popular" setaudiourl={setaudiourl} pauseState={pauseState} playState={playState} appFavList={props.appFavList} setAppFavList={props.setAppFavList} />
        <SplideComponent songarr={songarr} setsongarr={setsongarr} cat="dance" setaudiourl={setaudiourl} pauseState={pauseState} playState={playState} appFavList={props.appFavList} setAppFavList={props.setAppFavList} />

        <div className="popular_hits">
          <h4 className="song_cat_txt">Take a Chill Pill</h4>
          <Splide
            options={{
              rewind: true,
              // width : 300,
              gap: '1rem',
              perPage: 8,
              type: 'loop',
              autoplay: true,
              height: '15rem'
            }}
            aria-label="My Favorite Images"
          >
            <SplideSlide>
              <img src="assets/demo_img.jpg" alt="pict" />
            </SplideSlide>
            <SplideSlide>
              <img src="assets/demo_img.jpg" alt="pict" />
            </SplideSlide>
            <SplideSlide>
              <img src="assets/demo_img.jpg" alt="pict" />
            </SplideSlide>
            <SplideSlide>
              <img src="assets/demo_img.jpg" alt="pict" />
            </SplideSlide>
            <SplideSlide>
              <img src="assets/demo_img.jpg" alt="pict" />
            </SplideSlide>
            <SplideSlide>
              <img src="assets/demo_img.jpg" alt="pict" />
            </SplideSlide>
            <SplideSlide>
              <img src="assets/demo_img.jpg" alt="pict" />
            </SplideSlide>
            <SplideSlide>
              <img src="assets/demo_img.jpg" alt="pict" />
            </SplideSlide>
            <SplideSlide>
              <img src="assets/demo_img.jpg" alt="pict" />
            </SplideSlide>
          </Splide>
        </div>

        <div className="popular_hits">
          <h4 className="song_cat_txt">Sad Zone</h4>
        </div>

        <div className="popular_hits">
          <h4 className="song_cat_txt">Workout Vibes</h4>
        </div>

        <div className="popular_hits">
          <h4 className="song_cat_txt">Let's Go Back</h4>
        </div>

        <div className="popular_hits">
          <h4 className="song_cat_txt">Recommended for today</h4>
        </div>

        <AudioPlayerComp audiourl={audiourl} getpauseplay={getpauseplay} />
      </div>
    </>
  )
}

export default MiddleComponent