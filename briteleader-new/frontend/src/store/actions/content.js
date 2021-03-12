import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as base from '../../components/env'

export const popupStart = (ptarget, paction, pdata, targetId) => {
	return {
		type: actionTypes.POPUP_START,
		ptarget,
		paction,
		pdata,
		targetId
	}
}

export const popupClose = (pdata) => {
	return {
		type: actionTypes.POPUP_CLOSE,
		pdata
	}
}

export const saveFail = (err) => {
	return {
		type: actionTypes.SAVE_FAIL,
		err
	}
}

export const setPID = (pid) => {
	return {
		type: actionTypes.SET_PID,
		pid
	}
}
export const setProfile = (profile) => {
	return {
		type: 'SET_PROFILE',
		profile: profile
	}
}
export const setflightime = (data) =>{
	return {
		type:'SET_FLIGHTIME',
		data:data
	}
}
export const setComProfile = (comprofile)=>{
	return{
		type:'SET_COMPROFILE',
		comprofile:comprofile
	}
}
export const setUserProfile = (userprofile)=>{
	return{
		type:'SET_USERPROFILE',
		userprofile:userprofile
	}
}
//portfolio
export const settotalexp=(totalexp)=>{
	return{
		type:'SET_TOTALEXP',
		totalexp
	}
}
export const setportfolioinfo=(portfolio)=>{
	return {
		type:'SET_PORTFOLIO',
		portfolio

	}
}
export const setpostinfo=(postinfo)=>{
	return{
		type:'SET_POST',
		postinfo
	}
}
export const setEditArticle=(info)=>{
	return{
		type:'SET_EDITARTICLE',
		info
	}
}
export const setDelArtid=(id)=>{
	return{
		type:'SET_DELARTID',
		id
	}
}
export const getProfile = () => {
	let url = base.base_url+ '/pro/professional/prodetail';
	const token = localStorage.getItem('token');
	return dispatch => {
		axios.defaults.headers.common['Authorization'] ="token " + token;
		axios.get(url)
		.then(res => {
			dispatch(setProfile(res.data));
		})
		.catch(err => {
			console.log(err)
		});
	}
}
export const setsearchval =(val)=>{
	return{
		type:'SET_SEARCH',
		val
	}
}
export const popupSave = (ptarget, paction, pdata, targetId, pid) => {
	let url = '';
	let data = {};
	
	switch (ptarget){
		case 'overview':
			if(paction=='update')
				url = `${base.base_url}/pro/professional/${targetId}/`;
			else
				url = `${base.base_url}/pro/professional/`;
			data = {'overview':pdata.content};
			break;
		case 'skills':
			url = `${base.base_url}/pro/professional/${targetId}/`;
			data = {'skills':pdata.skills};
			break;
		case 'experience':
			if(paction=='update')
				url = `${base.base_url}/pro/experience_profile/${targetId}/`;
			else
				url = `${base.base_url}/pro/experience_profile/`;
			data = pdata;
			break;
		case 'education':
			if(paction=='update')
				url = `${base.base_url}/pro/education_profile/${targetId}/`;
			else
				url = `${base.base_url}/pro/education_profile/`;
			data = pdata;
			break;
	}
	if(paction=='update'){
		return dispatch => {
			const token = localStorage.getItem('token');
			axios.defaults.headers.common['Authorization'] ="token " + token;
			axios.patch(url,data)
			.then(res => {
				let pdata = {}
				if(typeof(res.data.overview)!='undefined')
					pdata['content'] = res.data.overview;
				else if(typeof(res.data.skills)!='undefined')
					pdata['skills'] = res.data.overview;
				else
					pdata = res.data;

				dispatch(getProfile());
				dispatch(popupClose(pdata));
			})
			.catch(err => {
				console.log(err)
				dispatch(saveFail(err))
			})
		}
	}else{
		return dispatch  => {
			const token = localStorage.getItem('token');
			axios.defaults.headers.common['Authorization'] ="token " + token;
			axios.post(url,data)
			.then(res => {
				let pdata = {}
				if(typeof(res.data.overview)!='undefined')
					pdata['content'] = res.data.overview;
				else
					pdata = res.data;
				dispatch(getProfile());
				dispatch(popupClose(pdata));
			})
			.catch(err => {
				console.log(err)
				dispatch(saveFail(err))
			})
		}
	}
}