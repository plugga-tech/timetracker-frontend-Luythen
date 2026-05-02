import { useState } from "react"

const Register = () => {
    const url : String = "https://timetracker-backend-app-cwdiu.ondigitalocean.app" 
    
    const [username, setUsername] = useState<String | null>(null)
    const [password, setPassword] = useState<String | null>(null)
    const [email, setEmail] = useState<String | null>(null);
    
    const [error, setError] = useState<String | null>(null)
        
    const handleLoginClick = async () => {
        const response = await fetch(url + "/auth/register", {
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
        </div>
    )
}

export default Register;