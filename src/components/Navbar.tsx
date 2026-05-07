const Navbar = ({isAuthenticated, isAdmin} : {isAuthenticated: boolean, isAdmin: boolean}) => {

    const url : String = "https://timetracker-backend-app-cwdiu.ondigitalocean.app"

    const handleLogoutClick = async () => {
        const response = await fetch(url + "/auth/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })

        if (!response.ok) {
            console.log("not good")
        }

        if (response.ok) window.location.href = "/login"
    }

    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">TimeTracker</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {
              isAuthenticated ?
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/panel">Tracker</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/statistics">Statistics</a>
                </li>
                { isAdmin ? <li className="nav-item">
                  <a className="nav-link" href="/admin">Admin</a>
                </li> : <></>}
              </ul> 
              : 
              <></>
            }
            <div className="d-flex">
              { isAuthenticated ? <button className="btn btn-danger" onClick={handleLogoutClick}>Logout</button> : <a className="btn btn-danger" href="/login">Login</a>}
            </div>
          </div>
        </div>
      </nav>
    )
}

export default Navbar;