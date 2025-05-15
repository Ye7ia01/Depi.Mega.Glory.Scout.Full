import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const AuthContext = createContext({})

/**
 * AuthProvider component
 *
 * This component provides authentication context to its children.
 * It manages the authentication state, including user information,
 * loading state, and error messages.
 *
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The child components
 * @returns {JSX.Element} The rendered component
 */
export const AuthProvider = ({children}) => {

    // // Demo user object for development mode
    // const demoUser = {
    //     token: "demoToken",
    //     username: "Demo",
    //     id: 1,
    //     accessLevel: 1,
    //     user_type: 2, // 1 player, 2 coach
    //     info: {
    //         id: 1,
    //         name: "Demo Full Name",
    //         phone: "",
    //         email: "demo@gmail.com",
    //         mobile: ""
    //     }
    // }

    // State to manage authentication loading state
    const [authLoading, setAuthLoading] = useState(false);
    // State to manage authentication status
    const [authenticated, setAuthenticated] = useState(false);
    // State to manage authentication error state
    const [authError, setAuthError] = useState(false);
    // State to manage authentication error message
    const [authMessage, setAuthMessage] = useState("");
    // State to manage user information
    const [user, setUser] = useState();
    // State to manage development mode
    // const [devMode, setDevMode] = useState(true)

    // Effect to check local storage for user information on component mount
    useEffect(() => {
        setAuthLoading(true);
        const effect = async () => {
            let json = await localStorage.getItem('user');
            console.log(json)
            let userObject = JSON.parse(json ?? '{}');
            if (userObject?.token) {
                setUser(userObject);
                setAuthenticated(true);
                setAuthLoading(false);
                console.log(authenticated);
                return;
            }
            // if (devMode) {
            //     console.info("Dev Mode Detected")
            //     setUser(demoUser)
            //     setAuthenticated(true)
            //     setAuthLoading(false)
            //     console.info("Authenticated Demo User in Dev Mode")
            // }
            setAuthLoading(false);
            console.log(authenticated);
        }
        effect();
    }, []);

    // Effect to log user information when it changes
    useEffect(() => {
        if (user) {
            console.log("User in UseEffect   : ", user)
        }
    }, [user])

    /**
     * Function to handle user login
     *
     * @param {string} email - The username
     * @param {string} password - The password
     * @returns {Promise<void>}
     */

    const registerPlayer = async (formData) => {
        console.log("In Register Method AUTHCONTEXT", formData);
        setAuthLoading(true);
        setAuthError(false);
        setAuthMessage(false);

        axios.post('http://glory-scout.tryasp.net/api/Auth/register-player', formData , {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(res => {
            console.log("Data : ",res)
            let data = res.data
            if (!data) {
                console.log("Not a valid user type");
                setAuthError(true);
                setAuthMessage("Cannot Sign In");
                setUser({});
                setAuthLoading(false);
                return;
            }

            // Set User Object based on retrieved data from Database
            const userObj = {
                token: data?.token,
                username: data?.username,
                role: data?.role,
                email: data?.email,
                profilePhoto: data?.profilePhoto,
            };
            setUser(userObj);
            const setStorage = async () => {
                await localStorage.setItem('user', JSON.stringify(userObj));
                const json = await localStorage.getItem('user');
                console.log('SET STORAGE');
                console.log(json);
                setAuthError(false);
                setAuthLoading(false);
                setAuthenticated(true);
            }
            setStorage();
        }).catch(err => {
            console.log(JSON.stringify(err));
            console.log(err?.response?.data);
            setAuthError(true);
            setUser();
            setAuthMessage(err?.response?.data ?? "Error, Cannot Sign In");
            setAuthLoading(false);
        })
    }


    const registerCoach = async (formData) => {
        console.log("In Register Method AUTHCONTEXT", formData);
        setAuthLoading(true);
        setAuthError(false);
        setAuthMessage(false);

        axios.post('http://glory-scout.tryasp.net/api/Auth/register-coach', formData , {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(res => {
            console.log("Data : ",res)
            let data = res.data
            if (!data) {
                console.log("Not a valid user type");
                setAuthError(true);
                setAuthMessage("Cannot Sign In");
                setUser({});
                setAuthLoading(false);
                return;
            }

            // Set User Object based on retrieved data from Database
            const userObj = {
                token: data?.token,
                username: data?.username,
                role: data?.role,
                email: data?.email,
                profilePhoto: data?.profilePhoto,
            };
            setUser(userObj);
            const setStorage = async () => {
                await localStorage.setItem('user', JSON.stringify(userObj));
                const json = await localStorage.getItem('user');
                console.log('SET STORAGE');
                console.log(json);
                setAuthError(false);
                setAuthLoading(false);
                setAuthenticated(true);
            }
            setStorage();
        }).catch(err => {
            console.log(JSON.stringify(err));
            setAuthError(true);
            setUser();
            setAuthMessage(JSON.stringify(err) ?? "Error, Cannot Sign In");
            setAuthLoading(false);
            setAuthMessage(err?.response?.data ?? "Error, Cannot Sign In");
        })
    }




    const loginAsync = async (email, password) => {
        console.log("In Async Method");
        setAuthLoading(true);
        setAuthError(false);
        setAuthMessage(false);

        axios.post('http://glory-scout.tryasp.net/api/Auth/login', {
            email, password
        }, {
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(res => {
            console.log("Data : ",res)
            let data = res.data
            if (!data) {
                console.log("Not a valid user type");
                setAuthError(true);
                setAuthMessage("Cannot Sign In");
                setUser({});
                setAuthLoading(false);
                return;
            }

            // Set User Object based on retrieved data from Database
            const userObj = {
                token: data?.token,
                username: data?.username,
                // id: data?.userId,
                role: data?.role,
                email: data?.email,
                profilePhoto: data?.profilePhoto,
            };
            setUser(userObj);
            const setStorage = async () => {
               await localStorage.setItem('user', JSON.stringify(userObj));
               const json = await localStorage.getItem('user');
               console.log('SET STORAGE');
               console.log(json);
               setAuthError(false);
               setAuthLoading(false);
               setAuthenticated(true);
            }
            setStorage();
        }).catch(err => {
            console.log(JSON.stringify(err));
            setAuthError(true);
            setUser();
            setAuthMessage(err?.response?.data ?? "Invalid email or password");
            setAuthLoading(false);
        })
    }

    /**
     * Function to handle user logout
     *
     * @returns {Promise<void>}
     */
    const logoutAsync = async () => {
        setAuthLoading(true);
        setAuthError(false);
        setUser({});
        await localStorage.removeItem('user');
        setAuthenticated(false);
        setAuthLoading(false);
    }

    return <AuthContext.Provider value={{loginAsync, authLoading, user, authenticated, authError, authMessage, logoutAsync, registerPlayer, registerCoach}}>
        {children}
    </AuthContext.Provider>
}