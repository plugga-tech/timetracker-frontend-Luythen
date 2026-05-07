import { useEffect, useState } from "react";
import type { timeTrackerInterface, useTimeTrackerServiceInterface } from "../interface/timeTrackerInterface";
import { URL_BACKEND } from "./URL";

const useTimeTrackerService = (): useTimeTrackerServiceInterface => {

    const [timers, setTimes] = useState<timeTrackerInterface[] | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(URL_BACKEND + "/timetracker/list", {
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
                const parsedTimes = (data as timeTrackerInterface[]).map((time) => ({
                    ...time,
                    startDate: new Date(time.startDate),
                    stopDate: time.stopDate !== null ? new Date(time.stopDate) : null
                }))
                setTimes(parsedTimes)
            }).finally(() => {
                setLoading(false)
            })
    }, [])

    return { timers, loading }

}

export default useTimeTrackerService;