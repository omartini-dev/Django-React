import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as base from '../../components/env'

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
}

export const authSuccess = (token) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		
	}
}

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	}
}

export const logout = () => {
	localStorage.removeItem('user');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('iscompany', null);
	localStorage.removeItem('token', null);
	localStorage.removeItem('userinfo', null);
	//window.location.href = "/signin";
	return {
		type: actionTypes.AUTH_LOGOUT
	}
}

export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
			window.location.href = "/home";
		}, expirationTime * 1000)
	}
}

export const authLogin = (username, password) => {
	return dispatch => {
		dispatch(authStart());
		axios.post(base.base_url+ '/myauth/login',{
			username:username,
			password:password
		})
		.then(res => {
			const token = res.data.token;
			const id = res.data.user_id;
			// const email = res.data.email;
			const company = res.data.profile.is_company;
			const city	= res.data.profile.city;
			const expirationDate = new Date(new Date().getTime() + 3600*1000);
			localStorage.setItem('token', token);
			var userinfo = res.data.profile;
			localStorage.setItem('userinfo',JSON.stringify(userinfo));
			
			localStorage.setItem('expirationDate', expirationDate);
			localStorage.setItem('iscompany', company);
			localStorage.setItem('city', city);
			localStorage.setItem('id',id);
			dispatch(authSuccess(token));
			dispatch(checkAuthTimeout(3600));

			window.location.href = "/";
		})
		.catch(err => {
			console.log(err)
			dispatch(authFail(err))
		})
	}
}
export const authLoginSuccessProcess = (res) => {
	return dispatch => {
		dispatch(authStart());
		const token = res.data.token;
		const id = res.data.user_id;
		// const email = res.data.email;
		const company = res.data.profile.is_company;
		const city	= res.data.profile.city;
		const expirationDate = new Date(new Date().getTime() + 3600*1000);
		localStorage.setItem('token', token);
		var userinfo = res.data.profile;
		localStorage.setItem('userinfo',JSON.stringify(userinfo));
		
		localStorage.setItem('expirationDate', expirationDate);
		localStorage.setItem('iscompany', company);
		localStorage.setItem('city', city);
		localStorage.setItem('id',id);
		dispatch(authSuccess(token));
		dispatch(checkAuthTimeout(3600));

		window.location.href = "/";
	}
}
export const authLoginFailedProcess = (err) => {
	return dispatch => {
		dispatch(authStart());
		dispatch(authFail(err));
	}
}
export const authSignup = (username, email, password1, password2) => {
	return dispatch => {
		dispatch(authStart());
		axios.post(base.base_url+ '/api-token-auth/',{
			username:username,
			password:password
		})
		.then(res => {
			const token = res.data.token;
			const expirationDate = new Date(new Date.getTime() + 3600*1000);
			localStorage.setItem('token', token);
			localStorage.setItem('expirationDate', expirationDate);
			dispatch(authSuccess(token));
			dispatch(checkAuthTimeout(3600));
		})
		.catch(err => {
			dispatch(authFail(err))
		})
	}
}
export const authCheckState = (inputToken) => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (token === undefined || token==null) {
			if(inputToken==null)
				dispatch(logout());
			else {
				dispatch(authSuccess(inputToken));
				dispatch(checkAuthTimeout(3600));
			}
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if ( expirationDate <= new Date() ) {
				 dispatch(logout());
			} else {
				dispatch(authSuccess(token));
				dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000) );
			}
		}
	}
}
