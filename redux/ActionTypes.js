export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNUP';
export const LOGOUT="LOGOUT"
export const UPDATE_USER="UPDATE_USER"
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
		type: "ACTIVATE_LOADING",
		status
	};
}