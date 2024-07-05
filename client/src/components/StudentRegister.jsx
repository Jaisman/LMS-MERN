import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoogleAuth from './GoogleAuth';
import Toast from "./Toast";

const StudentRegister = () => {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [toast, setToast] = useState(null);

    const [student, setStudent] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        address: '',
        password: '',
        password2: '',

    });

    const showToast = (message, duration = 3000) => {
        setToast({ message });
        return new Promise((resolve) => {
          setTimeout(() => {
            setToast(null);
            resolve();
          }, 1000);
        });
      };

    let handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value })
    }


    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post(`/api/student/studentRegister`, {
                ...student
            });

            if (response.status === 200) {
                await showToast(
                  "Registered Successfully"
                );
                setTimeout(()=>{
                    navigate('/login');
                },2000)
            } else {
                showToast("Something went wrong!");
            }
            console.log(response.data)
           
            // if (response.data) {
            //   setSuccessAlert(true)
            //   setTimeout(() => {
            //     setSuccessAlert(false)
            //   }, 4000);
            // }
            // console.log(student);
            // setStudent({
            //   name: '',
            //   lastName: '',
            //   email: "",
            //   mobileNumber: '',
            //   address: '',
            //   password: '',
            //   password2: '',
            //   description:''
            // })
            // setShowAlert(false);
        } catch (error) {
            console.log('this is a error')
            console.error(error)
            showToast("Something went wrong!");
            setShowAlert(!showAlert)
            setTimeout(function () {
                setShowAlert(false)
            }, 4000)
        }
    };

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 " id='flex-container'>
                <div id='animation-contanier' style={{ marginBottom: '0' }}>
                    <div>
                        <a className="flex items-center ps-2.5 mb-3">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 me-3 sm:h-7" alt="Flowbite Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white" style={{ fontSize: '1.8rem', marginRight: '15px' }}>E-learning</span>
                        </a>
                    </div>
                </div>

                <div className="mt-0 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-1" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900" style={{ textAlign: 'initial', fontSize: '1.0rem' }}>
                                Name
                            </label>
                            <div className="mt-0">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={student.name}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6  p-2 px-3 "
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900" style={{ textAlign: 'initial', fontSize: '1.0rem' }}>
                                Email
                            </label>
                            <div className="mt-0">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={student.email}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6  p-2 px-3"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900" style={{ textAlign: 'initial', fontSize: '1.0rem' }}>
                                Address
                            </label>
                            <div className="mt-0">
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    autoComplete="address"
                                    required
                                    value={student.address}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6  p-2 px-3"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="mobileNumber" className="block text-sm font-medium leading-6 text-gray-900" style={{ textAlign: 'initial', fontSize: '1.0rem' }}>
                                Mobile Number
                            </label>
                            <div className="mt-0">
                                <input
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    type="text"
                                    autoComplete="mobileNumber"
                                    required
                                    value={student.mobileNumber}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6  p-2 px-3"
                                />
                            </div>
                        </div>


                        <div>
                            <label htmlFor="password" id="password" className="block text-sm font-medium leading-6 text-gray-900" style={{ textAlign: 'initial', fontSize: '1.0rem' }}>
                                Password
                            </label>
                            <div className="mt-0">
                                <div className="max-w-sm">
                                    <div className="flex">
                                        <div className="relative flex-1">
                                            <input type="text"
                                                autoComplete='off'
                                                onChange={handleChange} value={student.password} name='password'
                                                id="hs-strong-password-with-indicator-and-hint-in-popover" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6  p-2 px-3" placeholder="" />
                                            <div id="hs-strong-password-popover" className="hidden absolute z-10 w-full bg-white shadow-md rounded-lg p-4 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700" >
                                                <div id="hs-strong-password-in-popover" data-hs-strong-password='{
            "target": "#hs-strong-password-with-indicator-and-hint-in-popover",
            "hints": "#hs-strong-password-popover",
            "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-teal-500 h-2 flex-auto rounded-full bg-blue-500 opacity-50 mx-1",
            "mode": "popover"
          }' className="flex mt-2 -mx-1">
                                                </div>

                                                <h4 className="mt-3 text-sm font-semibold text-gray-800 dark:text-white">
                                                    Your password must contain:
                                                </h4>

                                                <ul className="space-y-1 text-sm text-gray-500">
                                                    <li data-hs-strong-password-hints-rule-text="min-length" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                                                        <span className="hidden" data-check>
                                                            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                        </span>
                                                        <span data-uncheck>
                                                            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                        </span>
                                                        Minimum number of characters is 8.
                                                    </li>
                                                    <li data-hs-strong-password-hints-rule-text="lowercase" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                                                        <span className="hidden" data-check>
                                                            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                        </span>
                                                        <span data-uncheck>
                                                            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                        </span>
                                                        Should contain lowercase.
                                                    </li>
                                                    <li data-hs-strong-password-hints-rule-text="uppercase" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                                                        <span className="hidden" data-check>
                                                            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                        </span>
                                                        <span data-uncheck>
                                                            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                        </span>
                                                        Should contain uppercase.
                                                    </li>
                                                    <li data-hs-strong-password-hints-rule-text="numbers" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                                                        <span className="hidden" data-check>
                                                            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                        </span>
                                                        <span data-uncheck>
                                                            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                        </span>
                                                        Should contain numbers.
                                                    </li>
                                                    <li data-hs-strong-password-hints-rule-text="special-characters" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                                                        <span className="hidden" data-check>
                                                            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                        </span>
                                                        <span data-uncheck>
                                                            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                        </span>
                                                        Should contain special characters.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password2" className="block text-sm font-medium leading-6 text-gray-900" style={{ fontSize: '1.0rem' }}>
                                    Confirm Password
                                </label>

                            </div>
                            <div className="mt-0">
                                <input
                                    id="password2"
                                    name="password2"
                                    type="text"
                                    autoComplete="off"
                                    required
                                    value={student.password2}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6  p-2 px-3"
                                />
                            </div>
                        </div>


                        <div>
                            <button
                                type="submit"

                                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mt-4"
                                style={{ fontSize: '1.0rem' }}
                            >
                                Create Account
                            </button>
                        </div>
                    </form>
                    {toast && <Toast message={toast.message} onClose={toast.onClose} />}


                <div className="divider divider-error text-sm">OR</div>
                <GoogleAuth />
                </div>
                <span className='mt-4 text-sm'>Already have an account? <a href="/login">Login</a></span>
            </div>


        </div>
    )
}

export default StudentRegister