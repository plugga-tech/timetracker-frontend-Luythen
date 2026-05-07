export interface userInfoInterface {
    id: string | null | undefined
    username: string | null | undefined
    email: string | null | undefined
    role: string | null | undefined
}

export interface sessionInterface {
    isAuthenticated: boolean
    userInfo: userInfoInterface | null,
    loading: boolean
}