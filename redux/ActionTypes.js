export const USERS = 'USERS';
export const SET_USER = 'SET_USER';
export const SET_USERS = 'SET_USERS';
export const SET_USERS_SEARCH = 'SET_USERS_SEARCH';
export const CLEAR_USER = 'CLEAR_USER';
export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNUP';
export const LOGOUT="LOGOUT"
export const UPDATE_USER="UPDATE_USER"
export const UPDATE_USERS_SEARCH="UPDATE_USERS_SEARCH"
export const ACTIVATE_LOADING="ACTIVATE_LOADING"
export const MESSAGES="MESSAGES"
export const GET_MESSAGES="GET_MESSAGES"
export const ACTIVATE_SCROLL="ACTIVATE_SCROLL"
export const ADD_MESSAGES="ADD_MESSAGES"
export const SEND_MESSAGE="SEND_MESSAGE"
export function currentUser(user) {
	return {
		type: SET_USER,
		user,isLogin:true
	};
}
export function clearUser() {
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
export function getUsersSearch(users) {
	return {
		type: SET_USERS_SEARCH,
		search:users
	};
}
export function getMessages(data) {
	return {
		type: MESSAGES,
		data
	};
}
export function addMessage(data){
	return {
		type: ADD_MESSAGES,
		data
	};
}