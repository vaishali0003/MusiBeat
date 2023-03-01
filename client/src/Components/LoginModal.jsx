import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom';
import Context from '../context/auth/Context';

const LoginModal = () => {
    const context = useContext(Context);
    const [logininfo, setLogininfo] = useState({ email: "", password: "" });

    const closeModal = () => {
        document.querySelector('.loginModal').classList.toggle('hidden');
    }

    const onChange = (e) => {
        setLogininfo({ ...logininfo, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        context.login(logininfo.email, logininfo.password);
        setLogininfo({ email: "", password: "" });
    }

    return (
        <>
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="loginModal fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                <div className="relative w-full h-full max-w-md md:h-auto" style={{ 'margin': 'auto' }}>
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700" style={{ 'padding': '0.6rem' }}>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal" onClick={closeModal} style={{
                            'right': '7px',
                            'top': '4px',
                            'position': 'absolute'
                        }}>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" style={{ 'margin': '0.5rem 0' }} placeholder="" onChange={onChange} value={logininfo.email} required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                    <input type="password" name="password" id="password" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" style={{ 'margin': '0.5rem 0' }} onChange={onChange} value={logininfo.password} required />
                                </div>

                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ 'margin': '1rem 0' }}>Login to your account</button>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                    Not registered? <NavLink to="/signup" onClick={()=>{document.querySelector('.loginModal').classList.toggle('hidden');}} className="text-blue-700 hover:underline dark:text-blue-500" style={{'color':'blue'}}>Create account</NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginModal