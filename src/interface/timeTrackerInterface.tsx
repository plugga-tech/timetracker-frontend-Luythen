import type { category } from "./categoryInterface"

export interface timeTrackerInterface {
    id: string
    category: category
    userModel: {
        id: string
    }
    startDate: Date
    stopDate: Date | null
}

export interface useTimeTrackerServiceInterface {
    timers: timeTrackerInterface[] | null
    loading: boolean
}