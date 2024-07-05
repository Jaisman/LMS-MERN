import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GlobalContext from "./GlobalContext";
const AppContext = ({ children }) => {
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState('');
    const [userAuth, setUserAuth] = useState(false)
    const [login, setLogin] = useState(false)
    const navigate = useNavigate()
    function checkUser(userRole,role) {
        let token = localStorage.getItem('token');
        if (!token) {
            navigate('/login')
        }
        if(userRole!==role){
            navigate('/login');
        }
    }

    useEffect(() => {
        async function authUser() {
            try {
                let token = localStorage.getItem('token')
                let response = await axios.get('/api/auth/verify', {
                    headers: {
                        token: token
                    }
                })
                let details = response.data.userDetails;
                let userId = details._id;
                if (details.role === 'student') {
                    let userResponse = await axios.get('/api/student/findStudent', {
                        params: {
                            id: userId
                        }
                    })
                    let userDetails = userResponse.data
                    setUser(userDetails)

                    // console.log(userResponse.data, 'findTeacher')

                } else if (details.role === 'teacher') {
                    let userResponse = await axios.get('/api/teacher/findTeacher', {
                        params: {
                            id: userId
                        }
                    })
                    let userDetails = userResponse.data
                    setUser(userDetails)

                    console.log(userResponse.data, 'findTeacher')

                }


                // console.log(userId)
                setUserId(userId);
                // console.log(userId)
            } catch (error) {
                console.error(error)
            }
        }
        authUser();
    }, [navigate])

    return (
        <GlobalContext.Provider value={{ user, setUser, userId, userAuth, login, setLogin, setUserAuth, checkUser, navigate }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default AppContext;