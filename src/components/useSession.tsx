import { useEffect, useState } from "react";
import type { sessionInterface, userInfoInterface } from "../interface/useSessionInterface";
import { URL_BACKEND } from "./URL";

const useSession = () : sessionInterface => {
    const [isAuthenticated, setAuthenticated] = useState(true)
    const [userInfo, setUserInfo] = useState<userInfoInterface | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(URL_BACKEND + "/auth/me", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.status === 403 && !res.ok) return setAuthenticated(false);
            if (res.status === 200) {
                res.json().then((data) => {
                    setUserInfo(data as userInfoInterface)
                    setAuthenticated(true)
                })
            }
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return { isAuthenticated, userInfo, loading }
}

export default useSession;