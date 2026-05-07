import { useState } from "react";
import type { category } from "../interface/categoryInterface";
import type { timeTrackerInterface } from "../interface/timeTrackerInterface";
import ReadableTimer from "./ReadableTimer";
import { URL_BACKEND } from "./URL";

const TimersList = ({ timer, categorys }:{ timer: timeTrackerInterface[], categorys: category[] | null }) => {

    const [categoryID, setCategoryID] = useState<string | null>(null)
    const [timerID, setTimerID] = useState<string | null>(null)

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

    const handleUpdateButtonClick = async () => {
        if (categoryID != null) {
            const response = await fetch(URL_BACKEND + "/timetracker/update", {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: timerID,
                    "category": { id: categoryID },
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
        <div className="modal fade" id="timeTrackerUpdateModal" tabIndex={-1} aria-labelledby="timeTrackerUpdateModal" aria-hidden>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Update timer's category</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        { categorys ? <CategoryList /> : <p>No active categorys</p> }
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" type="button" onClick={handleUpdateButtonClick}>Update</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="list-group">
            {timer?.map((ti) => (
                <div key={ti.id} className="list-group-item list-group-item-action" onClick={() => {
                    setCategoryID(ti.category.id)
                    setTimerID(ti.id)
                }} data-bs-toggle="modal" data-bs-target="#timeTrackerUpdateModal">
                    <div className="card-body">
                        <h6 className="card-title">{ti.startDate.toLocaleString()} - {ti.stopDate?.toLocaleString()}</h6>
                        <h6 className="card-text badge text-bg-info">{ti.category.name}</h6>
                        <p className="card-text">{ReadableTimer((ti.stopDate !== null ? ti.stopDate?.getTime() : 1) - ti.startDate.getTime())}</p>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}

export default TimersList;