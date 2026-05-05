import { useEffect, useState } from "react";
import type { userInfoInterface } from "../interface/useSessionInterface";
import useCategoryService from "./useCategoryService";
import useTimeTrackerService from "./useTimeTrackerService"
import Loading from "./Loading";

interface msInteface {
    ms: number
}

const TimeTrackerComponent = (userInfo: userInfoInterface) => {
    const { timers, loading } = useTimeTrackerService()
    const { categorys } = useCategoryService()

    const todayDate = new Date();
    const activeTimer = timers?.find((t) => t.stopDate === null)
    const todaysTimers = timers?.filter((t) => t.startDate.getMonth() === todayDate.getMonth() && t.startDate.getDay() === todayDate.getDay() && t.stopDate !== null)

    const url : String = "https://timetracker-backend-app-cwdiu.ondigitalocean.app"

    const [categoryID, setCategoryID] = useState<string | null>(null)

    const ReadableTimer = (msI: msInteface) => {
        var seconds = Math.floor((msI.ms/1000)%60)
        var minutes = Math.floor((msI.ms/(1000*60)%60))
        var houres = Math.floor((msI.ms/(1000*60*60)%24))

        return (
            <>{houres} : {minutes} : {seconds}</>
        )
    }

    const ActiveTimeComponent = () => {
        const [timer, setTimer] = useState<number>(0)

        useEffect(() => {
            const interval = setInterval(() => {
                if (activeTimer?.startDate != undefined) {
                    setTimer(new Date().getTime() - activeTimer.startDate.getTime())
                }
            }, 1000)
            return () => clearInterval(interval)
        }, [])

        const handleStopButtonClick = async (id: string | undefined) => {
            const response = await fetch(url + "/timetracker/stop/" + id, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (!response.ok) {
                console.log("bad bad")
            }

            if (response.ok) window.location.reload()
        }

        return (
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-7">
                            <h3 className="card-title">{activeTimer?.category.name}</h3>
                        </div>
                        <div className="col-3">
                            <h3 className="text-center"><ReadableTimer ms={timer} /></h3>
                        </div>
                    </div>
                    <button className="btn btn-danger" onClick={() => handleStopButtonClick(activeTimer?.id) } >Stop</button>
                </div>
            </div>
        )
    }

    const CategoryList = () => {
        const handleCategoryClick = (id: string | null) => {
            setCategoryID(id)
        }

        return (
            <div className="list-group">
                {categorys?.map((c) => (
                    <button className={`list-group-item list-group-item-action ${categoryID === c.id ? "active" : ""}`} onClick={() => handleCategoryClick(c.id)} key={c.id}>{c.name}</button>
                ))}
            </div>
        )
    }

    const TimersList = () => {
        return (
            <div className="list-group">
                {todaysTimers?.map((ti) => (
                    <div key={ti.id} className="list-group-item list-group-item-action">
                        <div className="card-body">
                            <h6 className="card-title">{ti.startDate.toLocaleString()} - {ti.stopDate?.toLocaleString()}</h6>
                            <h6 className="card-text badge text-bg-info">{ti.category.name}</h6>
                            <p className="card-text"><ReadableTimer ms={(ti.stopDate !== null ? ti.stopDate?.getTime() : 1) - ti.startDate.getTime()} /></p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const handleStartButtonClick = async () => {
        if (categoryID != null) {
            const response = await fetch(url + "/timetracker/create", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "category": { id: categoryID },
                    "userModel": { id: userInfo.id }
                })
            })

            if (!response.ok) {
                console.log("bad bad")
            }

            if (response.ok) window.location.reload()
        }
    }

    return (
        <>
            <div className="modal fade" id="timeTrackerModal" tabIndex={-1} aria-labelledby="timeTrackerModal" aria-hidden>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Tracker</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            { categorys ? <CategoryList /> : <p>No active categorys</p> }
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" type="button" onClick={handleStartButtonClick}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <Loading loading={loading}>
                        <h5 className="card-title">TimeTracker - {todayDate.toLocaleDateString()}</h5>
                        {activeTimer ? <ActiveTimeComponent /> : <h6>No active time</h6>}
                        <button className={`btn btn-primary mt-2 ${activeTimer ? "disabled" : ""}`} data-bs-toggle="modal" data-bs-target="#timeTrackerModal">Start tracking</button>
                    </Loading>
                </div>
            </div>
            <div className="card mt-3">
                <Loading loading={loading}>
                    { todaysTimers?.length ? <TimersList /> : <p>No timers</p> }
                </Loading>
            </div>
        </>
    )
}

export default TimeTrackerComponent;