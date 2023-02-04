import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBar1 = () => {

    const onClick=()=>{
        document.getElementById('defaultModal').classList.toggle('hidden');
    }

    return (
        <>
            <div className="side_bar">
                <aside aria-label="Sidebar" className="side_bar1">
                    <div className="px-3 py-4 overflow-y-auto rounded bg-gray-50 dark:bg-gray-800 side_bar1">
                        <ul className="space-y-2">
                            <li className='logo_txt' style={{ "display": "flex", "alignItems": "center" }}>
                                <img src="headphone.png" alt="" srcSet="" style={{ "width": "30px", "margin": "1rem 0.3rem" }} />
                                <span className="ml-3" style={{ "WebkitTextStroke": "thick", "marginLeft": "4px" }}>MUSIBEAT</span>
                            </li>
                            <li>
                                <NavLink to="/" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-house-fill content_img" viewBox="0 0 16 16">
                                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
                                        <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
                                    </svg>
                                    <span className="ml-3">Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-search-heart-fill content_img" viewBox="0 0 16 16">
                                        <path d="M6.5 13a6.474 6.474 0 0 0 3.845-1.258h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.008 1.008 0 0 0-.115-.1A6.471 6.471 0 0 0 13 6.5 6.502 6.502 0 0 0 6.5 0a6.5 6.5 0 1 0 0 13Zm0-8.518c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z" />
                                    </svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Search</span>
                                </a>
                            </li>
                            <li>
                                <NavLink to="/favourites" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-heart-fill content_img" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                    </svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Favourites</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-music-note-beamed content_img" viewBox="0 0 16 16">
                                        <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z" />
                                        <path fillRule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z" />
                                        <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z" />
                                    </svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Playlists</span>
                                </NavLink>
                            </li>
                            <li>
                                <p className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={onClick}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus-square-fill content_img" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                                    </svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Create Playlists</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </>
    )
}

export default SideBar1