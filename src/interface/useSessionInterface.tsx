export interface userInfoInterface {
    id: string,
    username: string,
    email: string,
}

export interface sessionInterface {
    isAuthenticated: boolean
    userInfo: userInfoInterface | null
}