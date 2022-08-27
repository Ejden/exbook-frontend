export interface LoggedUser {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    img: string;
}

export interface UserState {
    loggedUser?: LoggedUser;
}

export enum UserStoreMutation {
    clearUser = 'clearUser',
    setUser = 'setUser'
}

export enum UserStoreAction {
    register = 'register',
    login = 'login',
    getUserInfo = 'getUserInfo',
    logout = 'logout'
}
