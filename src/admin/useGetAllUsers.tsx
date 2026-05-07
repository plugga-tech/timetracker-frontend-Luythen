import { useEffect, useState } from "react";
import type { userInfoInterface } from "../interface/useSessionInterface";
import { URL_BACKEND } from "../components/URL";

const useGetAllUsers = ()  => {
    const [users, setUsers] = useState<userInfoInterface[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch(URL_BACKEND + "/admin/users", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.status === 403 && !res.ok) return res.json().then((data) => setError(data));
            if (res.status === 200) {
                res.json().then((data) => {
                    setUsers(data as userInfoInterface[])
                })
            }
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return { users, loading, error }
}

export default useGetAllUsers;