export interface category {
    name: string | null
    id: string | null
    userModel: {
        id: string | null
    }
}

export interface useCategoryServiceInterface {
    categorys: category[] | null
    loading: boolean
}