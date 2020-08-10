import React from 'react'
import { NewTask } from './NewTask'
import NavBar from './NavBar'
import Login from './Login'
// import AppWs from './AppWs'

const App = () => {

    const [token, setToken] = React.useState<string | null>(null)

    const logout = async () => {

        try {
            await fetch('http://localhost:8000/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ token })
            });
            // console.log("Logout res:", response)

            setToken(null)
        } catch (e) {
            console.log("Read token error:", e);
        }
    }

    const readToken = async () => {
        try {
            const response = await fetch('http://localhost:8000/auth/token');

            console.log("Token res:", response)

            if (response.ok) {
                const body = await response.json()
                console.log("bd:", body)
                if (body?.token) {
                    setToken(body?.token)
                } else if (body?.error) {
                    setToken(null)
                }
            }
        } catch (e) {
            console.log("Read token error:", e);
        }
    };

    React.useEffect(() => {
        readToken();
    }, []);

    // { token ?
    //     <div>
    //         <NavBar logout={logout} />
    //         <br/>
    //         <NewTask/> 
    //         <br/>
    //     </div> : <Login setToken={setToken} />
    // }

    return (
        <React.Fragment>

            <div>
                <NavBar logout={logout} />
                <br />
                <NewTask />
                <br />
            </div>

        </React.Fragment>
    )
}

export default App