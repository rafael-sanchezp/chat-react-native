export const USERS = 'USERS';
export const SET_USER = 'SET_USER';
export const SET_USERS = 'SET_USERS';
export const CLEAR_USER = 'CLEAR_USER';
export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNUP';
export const LOGOUT="LOGOUT"
export const UPDATE_USER="UPDATE_USER"
export const ACTIVATE_LOADING="ACTIVATE_LOADING"
export const ACTIVATE_SCROLL="ACTIVATE_SCROLL"
export function currentUser(user) {
	return {
		type: SET_USER,
		user,isLogin:true
	};
}
export function clearUser(user) {
	return {
		type: CLEAR_USER
	};
}
export function loading(status) {
	return {
		type: ACTIVATE_LOADING,
		status
	};
}
export function loadingScroll(scroll) {
	return {
		type: ACTIVATE_SCROLL,
		scroll
	};
}
export function getUsers(users) {
	return {
		type: SET_USERS,
		users
	};
}