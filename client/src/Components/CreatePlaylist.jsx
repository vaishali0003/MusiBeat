import React, { useContext, useEffect, useState } from 'react'
import Context from '../context/auth/Context';

const CreatePlaylist = (props) => {
    const context = useContext(Context);
    const [playlists, setPlaylists] = useState([]);
    const [flag, setFlag] = useState(false);

    const getalltheplaylists = async () => {
        const all_playlists = await context.getallplaylists();
        setPlaylists(all_playlists);
        setFlag(!flag);
    }

    useEffect(() => {
        if(localStorage.getItem('auth_token')){
            getalltheplaylists();
        }
    }, [flag])

    const closeModal = () => {
        document.getElementById('defaultModal').classList.toggle('hidden');
    }

    const toggleaddnew = () => {
        document.querySelector('.newplaylist').classList.toggle('hidden')
    }

    const handleClick = (id) => {
        context.addplaylistsongs(id, props.currentPlaylistSong)
        document.getElementById('defaultModal').classList.toggle('hidden');
    }

    return (
        <>
            <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="createplaylist fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
            <div className="relative w-full h-full max-w-2xl md:h-auto" style={{ 'margin': 'auto' }}>
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Add to playlist...
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal" onClick={closeModal}>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="add_playlist_btn">
                        <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={toggleaddnew}>Add new</button>
                    </div>
                    <div className="existing_playlists_section">
                        {playlists.length!==0 ? (
                            playlists.map((item, index) => {
                                return (
                                    <div className="playlist_div1" key={index} onClick={() => { handleClick(item._id) }}>
                                        <div className="playlist_img_sec">
                                            <img src="playlisticon1.png" alt="" srcSet="" />
                                        </div>

                                        <div className="playlist_desc_sec">
                                            <p className="playlist_name1">{item.name}</p>
                                            <p className="no_of_songs">{item.songs.length} Songs</p>
                                        </div>
                                    </div>
                                )
                            })) : ( <div className="regret_message">No playlists to show</div>)}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CreatePlaylist