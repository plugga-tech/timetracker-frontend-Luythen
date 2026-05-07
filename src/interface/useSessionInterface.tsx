export interface userInfoInterface {
    id: string
    username: string
    email: string
    role: string
}

export interface sessionInterface {
    isAuthenticated: boolean
    userInfo: userInfoInterface
    loading: boolean
    isAdmin: boolean
}