import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	pstate:'close',
	ptarget:null,
	paction:null,
	pdata:null,
	targetId:null,
	pid:null,
	profile:null,
	err:null,

	portfolio:[],
	postinfo:[],
	comprofile:null,
	userprofile:null,
	searchval:'',
	editArticle:'',
	delartid:'',
	totalexp:'',
	calctime:[],
}

const popupStart = (state, action) => {
	return updateObject(state, {
		pstate:'open',
		ptarget: action.ptarget,
		paction: action.paction,
		pdata: action.pdata,
		targetId: action.targetId
	})
}

const popupClose = (state, action) => {
	return updateObject(state, {
		pstate:'close',
		pdata: action.pdata
	})
}
const popupSave = (state, action) => {
	return updateObject(state, {
		pdata: action.pdata,
	})
}
const setPID = (state, action) => {
	return updateObject(state, {
		pid: action.pid
	})
}
const saveFail = (state, action) => {
	return updateObject(state, {
		err: action.err
	})
}
const setProfile = (state, action) => {
	return updateObject(state, {
		profile: action.profile
	})
}
const setPost = (state,action)=>{
	return updateObject(state,{
		postinfo:action.postinfo
	})
}
const setportfolio = (state,action)=>{
	return updateObject(state,{
		portfolio:[...state.portfolio, action.portfolio]
	})
}
const setComProfile = (state,action)=>{
	return updateObject(state,{
		comprofile:action.comprofile
	})
}
const setUserProfile=(state,action)=>{
	return updateObject(state,{
		userprofile:action.userprofile
	})
}
const setSearchval=(state,action)=>{
	return updateObject(state,{
		searchval:action.val
	})
}
const setEditArticle=(state,action)=>{
	return updateObject(state,{
		editArticle:action.info
	})
}
const setDelArtid=(state,action)=>{
	return updateObject(state,{
		delartid:action.id
	})
}
const setTotalexp=(state,action)=>{
	return updateObject(state,{
		totalexp:action.totalexp
	})
}
const setflightime=(state,action)=>{
	return updateObject(state,{
		calctime:action.data
	})
}
const contentReducer = (state=initialState, action) => {
	switch (action.type) {
		case actionTypes.POPUP_START:
			return popupStart(state, action);
		case actionTypes.POPUP_CLOSE:
			return popupClose(state, action);
		case actionTypes.POPUP_SAVE:
			return popupSave(state, action);
		case actionTypes.SET_PID:
			return setPID(state, action);
		case actionTypes.SAVE_FAIL:
			return saveFail(state, action);
		case actionTypes.SET_PROFILE:
			return setProfile(state, action);
		case actionTypes.SET_PORTFOLIO:
			return setportfolio(state,action);
		case actionTypes.SET_POST:
			return setPost(state,action);
		case actionTypes.SET_COMPROFILE:
			return setComProfile(state,action);
		case actionTypes.SET_USERPROFILE:
			return setUserProfile(state,action);
		case actionTypes.SET_SEARCH:
			return setSearchval(state,action);
		case actionTypes.SET_EDITARTICLE:
			return setEditArticle(state,action);
		case actionTypes.SET_DELARTID:
			return setDelArtid(state,action);
		case actionTypes.SET_TOTALEXP:
			return setTotalexp(state,action);
		case actionTypes.SET_FLIGHTIME:
			return setflightime(state,action);
		default:
			return state;
	}
}

export default contentReducer;