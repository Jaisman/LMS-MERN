import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Ask = () => {
    const [selectedOption, setSelectedOption] = useState('student');
    const navigate = useNavigate()
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Selected option:', selectedOption);
        if (selectedOption == 'instructor') {
            navigate('/teacherRegister')
        } else {
            navigate('/studentRegister')
        }
        // Add your submission logic here
    }
    return (

        <>
            <div id="flex-container" style={{ width: '100%', height: '100%' }} > 
                <div style={{ marginTop: '15%' }} >
                    <div style={{ fontSize: '1.5rem', marginBottom: '10%', marginLeft: '1%' }} >Choose Your Role ⬇️</div>
                    <a href="/studentRegister" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 " style={{margin:'2rem',display:'inline-block',padding:'1rem',paddingLeft:'1.5rem',paddingRight:'1.5rem'}}  >STUDENT</a>
                    <a href="/teacherRegister" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 " style={{margin:'2rem',display:'inline-block',padding:'1rem',paddingLeft:'1.5rem',paddingRight:'1.5rem'}}  >INSTRUCTOR</a>
                </div>
            </div>
        </>
    )
}

export default Ask