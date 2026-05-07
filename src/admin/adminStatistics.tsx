import { useEffect, useState } from "react";
import type { timeTrackerInterface } from "../interface/timeTrackerInterface";
import { URL_BACKEND } from "../components/URL";
import Loading from "../components/Loading";
import ReadableTimer from "../components/ReadableTimer";
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(ArcElement ,Tooltip, Legend)

const AdminStatistics = ({ userID } : { userID: string }) => {
    const [userTimeTrackerData, setUserTimeTrackerData] = useState<timeTrackerInterface[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const data: { key: string , value: number}[] = []
    const categoryNames: string[] = []

    const todaysMonth = new Date();

    useEffect(() => {
        fetch(URL_BACKEND + "/admin/timetracker/" + userID, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
            }).then((res) => {
                if (res.status === 403 && !res.ok) return res.json().then((data) => setError(data));
                if (res.status === 200) {
                    res.json().then((data) => {
                        setUserTimeTrackerData(data as timeTrackerInterface[])
                    })
                }
            }).finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) return <Loading loading={loading} />
    if (error) return <div>{error}</div>

    const filterUserTimeTrackerData = userTimeTrackerData.filter((utt) => utt.startDate.getMonth() === todaysMonth.getMonth())
    if (filterUserTimeTrackerData === null) return <div className="accordion-body">No active timers this month</div>;

    filterUserTimeTrackerData.map((utt) => {
        if (categoryNames.find((canme) => utt.category.name !== canme) && utt.category.name !== null) categoryNames.push(utt.category.name);
        
        let timer = data.find((dt) => dt.key === utt.category.name && utt.stopDate !== null );
        if (timer !== undefined) {
            timer.value += (utt.stopDate?.getTime() ? utt.stopDate.getTime() : 0) - utt.startDate.getTime()
        } else {
            data.push({ key: utt.category.name ? utt.category.name : "", value: (utt.stopDate?.getTime() ? utt.stopDate.getTime() : 0) - utt.startDate.getTime()})
        }
    })

    const pieData = {
        labels: categoryNames,
        datasets: [{
            label: "ms",
            data: data,
            parsing: {
                xAxisKey: "key",
                yAxisKey: "value"
            },
            borderWidth: 1,
            backgroundColor: [
                "#2B4A7B",
                "#345995",
                "#287799",
                "#1C949D",
                "#2699A2",
                "#309EA6", 
                "#44A7AE"
            ]
        }]
    }

    const plugins = {
        tooltip: {
            enabled: true,
            intersect: false,
            callbacks: {
                label: function (context: any) {
                    let formattedTime = ReadableTimer(context.parsed)
                    return (
                        formattedTime
                    )
                }
            }
        }
    }

    const options = {
        maintainAspectRatio: true,
        aspectRatio: 2,
        plugins: plugins
    }

    return (
        <div className="accordion-body">
            <h1 className="text-center">{todaysMonth.toLocaleString("en-EN",{ month: "long"})}</h1>
            <Pie data={pieData} options={options}/>
        </div>
    )
}

export default AdminStatistics;