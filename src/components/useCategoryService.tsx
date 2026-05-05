import { useEffect, useState } from "react";
import type { category, useCategoryServiceInterface } from "../interface/categoryInterface";

const useCategoryService = () : useCategoryServiceInterface => {
    const [categorys, setCategorys] = useState<category[] | null>(null)
    const [loading, setLoading] = useState(true)

    const url : String = "https://timetracker-backend-app-cwdiu.ondigitalocean.app" 

    useEffect(() => {
        fetch(url + "/category/all", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
            }).then((res) => {
                return res.json();
            }).catch((e) => {
                console.log(e)
            }).then((data) => {
                setCategorys(data as category[])
            }).finally(() => {
                setLoading(false)
            })
    }, [])

    return { categorys, loading }
}

export default useCategoryService;