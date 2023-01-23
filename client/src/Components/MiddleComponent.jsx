import React from 'react'
import { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import popularTracks from './PopularTracks';
// var jsmediatags = require("jsmediatags");

const MiddleComponent = () => {

    const [popular, setpopular] = useState(popularTracks);

    // jsmediatags.read("assets/Ghodey_Pe_Sawaar.mp3", {
    //     onSuccess: function(tag) {
    //       console.log(tag);
    //     },
    //     onError: function(error) {
    //       console.log(':(', error.type, error.info);
    //     }
    //   });

    return (
        <>
            <div className="middle1">
                <div className="popular_hits">
                    <h4 className="song_cat_txt">POPULAR HITS</h4>
                    <Splide
                        options={{
                            rewind: true,
                            gap: '1rem',
                            perPage: 8,
                            type: 'loop',
                            autoplay: true,
                            height: '15rem'
                        }}
                        aria-label="My Favorite Images"
                    >
                        {popular.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <SplideSlide>
                                        <div className="img_part">
                                        <img src={item.image} alt="pict" style={{'borderRadius':'5px'}}/>
                                       <div className="music_player">
                                         <img src="assets/pause1.png" className='play_pause_img' id="pause" alt="pict" />
                                       </div>
                                        </div>
                                        <p className="song_name_p1" style={{'marginBottom':0}}>{item.name}</p>
                                        <p className="movie_name_p1">{item.movie}</p>
                                    </SplideSlide>
                                    </React.Fragment>
                            )

                        })}
                    </Splide>
                </div>

                <div className="popular_hits">
                    <h4 className="song_cat_txt">Dance Tracks</h4>
                    <Splide
                        options={{
                            rewind: true,
                            // width : 300,
                            gap: '1rem',
                            perPage: 6,
                            type: 'loop',
                            autoplay: true,
                            height: '15rem'
                        }}
                        aria-label="My Favorite Images"
                    >
                        <SplideSlide>
                            <img src="assets/demo_img.jpg" alt="pict"/>
                        </SplideSlide>
                        <SplideSlide>
                            <img src="assets/demo_img.jpg" alt="pict"/>
                        </SplideSlide>
                        <SplideSlide>
                            <img src="assets/demo_img.jpg" alt="pict"/>
                        </SplideSlide>
                        <SplideSlide>
                            <img src="assets/demo_img.jpg" alt="pict"/>
                        </SplideSlide>
                        <SplideSlide>
                            <img src="assets/demo_img.jpg" alt="pict"/>
                        </SplideSlide>
                        <SplideSlide>
                            <img src="assets/demo_img.jpg" alt="pict" />
                        </SplideSlide>
                        <SplideSlide>
                            <img src="assets/demo_img.jpg" alt="pict" />
                        </SplideSlide>
                        <SplideSlide>
                            <img src="assets/demo_img.jpg" alt="pict"/>
                        </SplideSlide>
                        <SplideSlide>
                            <img src="assets/demo_img.jpg" alt="pict"/>
                        </SplideSlide>
                    </Splide>
                </div>

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
                            <img src="assets/demo_img.jpg" alt="pict"/>
                        </SplideSlide>
                        <SplideSlide>
                            <img src="assets/demo_img.jpg" alt="pict"/>
                        </SplideSlide>
                        <SplideSlide>
                            <img src="assets/demo_img.jpg" alt="pict"/>
                        </SplideSlide>
                        <SplideSlide>
                            <img src="assets/demo_img.jpg" alt="pict"/>
                        </SplideSlide>
                        <SplideSlide>
                            <img src="assets/demo_img.jpg" alt="pict"/>
                        </SplideSlide>
                        <SplideSlide>
                            <img src="assets/demo_img.jpg" alt="pict"/>
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

            </div>
        </>
    )
}

export default MiddleComponent