import { useState } from "react"
import Loading from "./Loading"
import { URL_BACKEND } from "./URL"

const Register = ({isAuthenticated, loading}: {isAuthenticated: boolean, loading: boolean}) => {
    if (loading) return <Loading loading={loading} />
    if (isAuthenticated) return window.location.href = "/panel"
    
    const [username, setUsername] = useState<String | null>(null)
    const [password, setPassword] = useState<String | null>(null)
    const [email, setEmail] = useState<String | null>(null);
    
    const [error, setError] = useState<String | null>(null)
        
    const handleLoginClick = async () => {
        const response = await fetch(URL_BACKEND + "/auth/register", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password, email })
        })
    
        if (!response.ok) {
            const error = await response.json()
            setError(error)
            return
        }
    }
        
    return (
        <div className="container-sm">
            <div className="card">
                <div className="card-body">
                    <h4>Register</h4>
                    {error && <div>
                        {error}
                    </div> }
                    <label htmlFor="usernameInput" className="form-label">Email</label>
                    <input id="usernameInput" className="form-control" type="text" onChange={e => setEmail(e.target.value)} />
                    <label htmlFor="usernameInput" className="form-label">Username</label>
                    <input id="usernameInput" className="form-control" type="text" onChange={e => setUsername(e.target.value)} />
                    <label htmlFor="usernameInput" className="form-label">Password</label>
                    <input id="usernameInput" className="form-control" onChange={e => setPassword(e.target.value)} type="password" />
                    <button className="btn btn-primary" onClick={handleLoginClick}>Login</button>
                </div>
            </div>
            <a className="text-center" href="/login">Have an account already login here!</a>
        </div>
    )
}

export default Register;