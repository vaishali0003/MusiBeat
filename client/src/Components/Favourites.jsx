import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import SideBar1 from './SideBar1';

const Favourites = (props) => {
    const { appFavList } = props
    return (
        <>
            <div className="components">
                <SideBar1 />
                <div className="favourite_songs_div">
                    <Splide
                        options={{
                            rewind: true,
                            gap: '1rem',
                            perPage: 8,
                            height: '15rem'
                        }}
                        aria-label="My Favorite Images"
                    >
                        {appFavList ?
                            appFavList.map((item, index) => {
                                {console.log(item)}
                                return (
                                    <SplideSlide key={index}>
                                        <div className="img_part">
                                            <img src={"https://" + item.img_url} alt="pict" style={{ 'borderRadius': '5px' }} />
                                        </div>
                                        <p className="song_name_p1" style={{ 'marginBottom': 0 }}>{item.title}</p>
                                        <p className="movie_name_p1">{item.artist}</p>
                                    </SplideSlide>
                                )
                            })
                            :
                            <h1>Nothing to show</h1>
                        }
                    </Splide>
                </div>
            </div>
        </>
    )
}

export default Favourites