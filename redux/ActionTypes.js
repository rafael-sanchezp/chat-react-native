export const SET_SESSION = 'SET_SESSION';
export const CLEAR_SESION = 'CLEAR_SESION';


export function currentUser(user) {
	return {
		type: "SET_USER",
		user
	};
}
export function loading(status) {
	return {
		type: "ACTIVATE_LOADING",
		status
	};
}