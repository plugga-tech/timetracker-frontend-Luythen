import { useEffect, useState } from "react";
import type { sessionInterface, userInfoInterface } from "../interface/useSessionInterface";

const useSession = () : sessionInterface => {
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [userInfo, setUserInfo] = useState<userInfoInterface | null>(null)

    const url : String = "https://timetracker-backend-app-cwdiu.ondigitalocean.app" 

    useEffect(() => {
        fetch(url + "/auth/me", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            return res.json();
        }).catch((e) => {
            console.log(e)
            setAuthenticated(false)
        }).then((data) => {
            setUserInfo(data as userInfoInterface)
            setAuthenticated(true)
        })
    }, [])

    return { isAuthenticated, userInfo }
}

export default useSession;