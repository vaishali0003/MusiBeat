import React from 'react'
import Context from '../context/auth/Context'
import { useState,useContext } from 'react'

const SignUpModal = () => {

const [signupinfo,setSignupinfo]=useState({s_name:"",s_email:"",s_password:"",s_conf_password:"",role:"user"});
const context=useContext(Context);

const onChange=(e)=>{
   setSignupinfo({...signupinfo,[e.target.name]:e.target.value})
}

const handleSubmit=(e)=>{
    e.preventDefault();
    context.signup(signupinfo.s_name,signupinfo.s_email,signupinfo.s_password,signupinfo.s_conf_password,signupinfo.role);
    setSignupinfo({s_name:"",s_email:"",s_password:"",s_conf_password:"",role:""});
}

return (
<>
<div className="signUpForm">
    <div className="signUpForm1">
            <form onSubmit={handleSubmit}>
                <div className="signup_head d-flex justify-center">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign Up to our platform</h3>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="s_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" onChange={onChange} value={signupinfo.s_name} required />
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your name</label>
                    </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="email" name="s_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={onChange} value={signupinfo.s_email} required />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="password" name="s_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={onChange} value={signupinfo.s_password} required />
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    <input type="hidden" name="role" value={signupinfo.role}/>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="password" name="s_conf_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "value={signupinfo.s_conf_password} onChange={onChange} required />
                    <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{'marginTop':'1rem'}}>Sign Up</button>
            </form>
            </div>
            </div>
        </>
    )
}

export default SignUpModal