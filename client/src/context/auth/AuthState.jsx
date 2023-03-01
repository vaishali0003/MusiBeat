import React from "react";
import Context from "./Context";
import { useNavigate } from "react-router-dom";

const AuthState = (props) => {

    const navigate = useNavigate();

    const signup = async (name, email, password, conf_password,role) => {
        try {
            const response = await fetch('http://localhost:5100/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, conf_password,role })
            })
            const data = await response.json();
            if (data.success) {
                props.showAlert('User Signed in successfully', 'success');
                navigate('/');
                console.log('User signed in successfully');
                document.querySelector('.loginModal').classList.toggle('hidden');
            }
            else {
                props.showAlert(data.message, data.type);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5100/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json();
            if (data.success) {
                localStorage.setItem('auth_token', data.authToken);
                props.showAlert('User Logged in successfully', 'success');
                navigate('/');
                console.log('User logged in successfully');
                document.querySelector('.loginModal').classList.toggle('hidden');
            }
            else {
                props.showAlert('Invalid Credentials', 'danger');
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const addToFavourites = async (song) => {
        try {
            const response = await fetch('http://localhost:5100/auth/addfavourite', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'auth-token': localStorage.getItem('auth_token')
                },
                body: JSON.stringify({ song })
            })
            const data = await response.json();
            props.showAlert('Song added to favourites', 'success');
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const removeFavourites = async (id) => {
        try {
            const response = await fetch(`http://localhost:5100/auth/removeFavourite/${id}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'auth-token': localStorage.getItem('auth_token')
                }
            })
            const data = await response.json();
            props.showAlert('Song removed from favourites', 'success');
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const getfavourites=async()=>{
        try {
            const response = await fetch(`http://localhost:5100/auth/allfavourites`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'auth-token': localStorage.getItem('auth_token')
                }
            })
            const data = await response.json();
            return data;
        }
        catch (err) {
            console.log(err);
        }
    }

    const addplaylist = async (playlistname, song) => {
        try {
            const response = await fetch('http://localhost:5100/auth/addplaylist', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'auth-token': localStorage.getItem('auth_token')
                },
                body: JSON.stringify({ playlistname, song })
            })
            const data = await response.json();
            if(data.success){
                props.showAlert('Playlist added successfully', 'success');
            }
            else{
            props.showAlert(data.message, data.type);
            }
           
        }
        catch (err) {
            console.log(err);
        }
    }

    const getallplaylists = async () => {
        try {
            const response = await fetch('http://localhost:5100/auth/allplaylists', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'auth-token': localStorage.getItem('auth_token')
                },
            })
            const data = await response.json();
            return data;
        }
        catch (err) {
            console.log(err);
        }
    }

    const addplaylistsongs = async (id, song) => {
        try {
            const response = await fetch(`http://localhost:5100/auth/addplaylistsongs/${id}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'auth-token': localStorage.getItem('auth_token')
                },
                body: JSON.stringify({ song })
            })
            const data = await response.json();
            if(data.success){
                props.showAlert('song added successfully', 'success');
            }
            else{
                props.showAlert(data.message,data.type);
            }
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const deletesongs = async (id, id2) => {
        try {
            const response = await fetch(`http://localhost:5100/auth/deletesongs/${id2}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'auth-token': localStorage.getItem('auth_token')
                },
                body: JSON.stringify({id})
            })
            const data = await response.json()
            return data;
        }
        catch (err) {
            console.log(err)
        }
    }

    const deletePlaylist = async (id) => {
        try {
            const response = await fetch(`http://localhost:5100/auth/deleteplaylist/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'auth-token': localStorage.getItem('auth_token')
                },
                body: JSON.stringify({ id })
            })
            const data = await response.json();
            console.log('playlist deleted successfully');
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const loginAdmin=async(email,password)=>{
        try {
            const response = await fetch(`http://localhost:5100/auth/adminlogin`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'auth-token': localStorage.getItem('auth_token')
                },
                body: JSON.stringify({ email,password })
            })
            const data = await response.json();
           if(data.success){
            localStorage.setItem('admin_token',true);
            navigate('/admin');
           }
           else{
            props.showAlert(data.message,data.type);
           }
        }
        catch (err) {
            console.log(err);
        }
    }


    return (
        <Context.Provider value={{ signup, login, addplaylist, getallplaylists, addplaylistsongs, deletesongs, deletePlaylist, addToFavourites,removeFavourites, getfavourites,loginAdmin}}>
            {props.children}
        </Context.Provider>
    )

}
export default AuthState;