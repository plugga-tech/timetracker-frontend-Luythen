import {   Pie } from "react-chartjs-2";
import type { sessionInterface } from "../interface/useSessionInterface";
import Loading from "./Loading";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import useCategoryService from "./useCategoryService";
import useTimeTrackerService from "./useTimeTrackerService";

ChartJS.register(ArcElement ,Tooltip, Legend)

const ReadableTimer = (msI: number) => {
    var seconds = Math.floor((msI/1000)%60)
    var minutes = Math.floor((msI/(1000*60)%60))
    var houres = Math.floor((msI/(1000*60*60)%24))

    return `${houres}H : ${minutes}M : ${seconds}S`
}

const Statistics = (props: sessionInterface) => {
    const { timers } = useTimeTrackerService()
    const { categorys } = useCategoryService()

    if (props.loading) return <Loading loading={props.loading} />
    if (!props.isAuthenticated) return window.location.href = "/login"
    const data: any[] = []
    const categoryNames: string[] = []
    const todaysMonth = new Date()

    categorys?.map((c) => {
        if (c.name !== null) {
            categoryNames.push(c.name)
            const timersFilter = timers?.filter((t) => t.category.id === c.id && t.stopDate !== null && t.startDate.getMonth() === todaysMonth.getMonth())
            let totalTime = 0;
            if (timersFilter?.length !== undefined && timersFilter !== undefined) {
                if (timersFilter.length > 0) {
                    timersFilter.map((tf) => {
                        if (tf.stopDate !== null) totalTime += tf.stopDate.getTime() - tf.startDate.getTime() 
                    })
                }
            }

            data.push({ key: c.name, value: totalTime })
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
        <div className="container">
            <h1 className="text-center">{todaysMonth.toLocaleString("en-EN",{ month: "long"})}</h1>
            <Pie data={pieData} options={options}/>
        </div>
    )
}

export default Statistics;