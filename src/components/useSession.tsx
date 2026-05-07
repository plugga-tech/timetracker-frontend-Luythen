import { useEffect, useState } from "react";
import type { sessionInterface, userInfoInterface } from "../interface/useSessionInterface";
import { URL_BACKEND } from "./URL";

const useSession = () : sessionInterface => {
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [userInfo, setUserInfo] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        (async () => {
            const res = await fetch(URL_BACKEND + "/auth/me", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            console.log(res.status)

            if (!res.ok) {
                setAuthenticated(false)
                setIsAdmin(false)
                setLoading(false)
            }

            if (res.ok) {
                const parsedData = await res.json() as userInfoInterface
                setUserInfo(parsedData)
                if (parsedData.role === "Admin") setIsAdmin(true)
                setLoading(false)
                setAuthenticated(true)
            }
        })()
    }, [])

    return { isAuthenticated, userInfo, loading, isAdmin }
}

export default useSession;