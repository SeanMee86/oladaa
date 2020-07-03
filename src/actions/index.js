import axios from 'axios';
import $ from 'jquery';
import { browserHistory } from 'react-router';

import { AUTH_ERROR, AUTH_USER, UNAUTH_USER, FETCH_EVENTS, SAVE_LOCATION, FETCH_WEATHER, LOAD_SPINNER, VIEW_ALL } from './types';
/**
 * @type {AxiosInstance}
 */
const instance = axios.create({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});
/**
 * @type {string}
 */
// const base_url = '../backend/server';
const base_url = 'http://localhost/server';
let userId;
/**
 * @param username
 * @param password
 * @param email
 * @returns {Function}
 */
export function register_user({ username, password, email }) {
    return function (dispatch) {
        instance.post(`${base_url}/register.php`, {username, password, email}).then(resp=> {
            dispatch({
                type: AUTH_USER
            });
            if(resp.data["error"]){
               //Create a client-side response for the user based on failed registration
            }
            else {
                instance.post(`${base_url}/login.php`, {username, password}).then(resp => {
                    if (resp.data === 0) {
                        //Create a client-side response for the user based on invalid login credentials
                    }
                    else if(resp.data['val'] === 1){
                        browserHistory.push('/select_interests');
                        console.log(resp);
                        userId = resp.data.id;
                    }
                    else{
                        //Create a client-side response to inform the user that they're already logged in based on the username provided
                    }
                }).catch(err => {
                    //Create a client-side response to inform the user that the server is not responding
                    dispatch({
                        type: AUTH_ERROR,
                    });
                });
            }
        });
    }
}
/**
 * @param username
 * @param password
 * @returns {Function}
 */
export function login_user({ username, password}) {
    return function (dispatch) {
        instance.post(`${base_url}/login.php`, {username, password}).then(resp=>{
            dispatch({
                type: AUTH_USER
            });
            if(resp.data === 0){
                //Create a client-side response for the user based on invalid login credentials
            }
            else if(resp.data["val"] === 1){
                browserHistory.push('/app/welcome_user');
                console.log(resp);
            }
            else{
                //Create a client-side response to inform the user that they're already logged in based on the username provided
            }
        }).catch(err=>{
            //Create a client-side response to inform the user that the server is not responding
        });
    }
}
/**
 * @returns {Function}
 */
export function logout_user(){
    return function(dispatch){
        instance.post(`${base_url}/logout.php`).then(resp=>{
            //Create a client-side response to inform the user that their logout was successful
            dispatch({
                type: UNAUTH_USER
            })
        }).catch(err=>{
            //Create a client-side response to inform the user that their logout was unsuccessful
        })
    }
}
/**
 * @type {string}
 */
const MU_KEY = '&key=1012337b1a2c2a5974255a4412b237a';
/**
 * @param coords
 * @returns {Function}
 */
export function fetchEvents(coords){
    const lat = coords.latitude;
    const long = coords.longitude;
    return function(dispatch){

        instance.post(`${base_url}/get_interests.php`).then(resp=>{
            if(typeof resp.data !== 'string') {
                let meetup_url = 'https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&lon='+long+'&limited_events=False&text_format=plain&photo-host=public&page=10&radius=10&lat='+lat+'&desc=False&status=upcoming&category=';
                for (let i = 0; i < resp.data.length; i++) {
                    if(i===resp.data.length-1){
                        meetup_url+=resp.data[i].category_id+MU_KEY;
                    }
                    else{
                        meetup_url+=resp.data[i].category_id+"%2C";
                    }
                }
                $.ajax({
                    dataType: 'jsonp',
                    crossDomain: true,
                    method: 'GET',
                    url: meetup_url,
                    headers: {
                        'SameSite': 'None',
                        'Secure': '*'
                    },
                    success: function(response){
                        dispatch({
                            type: FETCH_EVENTS,
                            payload: response.results
                        });
                    },
                    error: function(response){
                        //Create a client-side response to inform the user that their connection to meetup was unsuccessful
                    }
                });
            }
            else{
                //Create a client-side response to inform the user that the server is not responding
            }
        }).catch(err=>{
            //Create a client-side response to inform the user that the server is not responding
        });
    };
}
//  START: FOR DISPLAYING ALL THE EVENTS IN VIEW ALL
/**
 * @param cat_id
 * @param coords
 * @param catIndex
 * @returns {Function}
 */
export function getEvent(cat_id, coords, catIndex){
    const lat = coords.latitude;
    const long = coords.longitude;
    let meetup_url = 'https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&lon='+long+'&limited_events=False&text_format=plain&photo-host=public&page=5&radius=10&lat='+lat+'&desc=False&status=upcoming&category='+cat_id+MU_KEY;
    return function (dispatch) {
        $.ajax({
            dataType: 'jsonp',
            crossDomain: true,
            method: 'GET',
            url: meetup_url,
            success: function(response){
                dispatch({
                    type: VIEW_ALL,
                    catIndex,
                    payload: response.results
                });
            },
            error: function(response){
                //Create a client-side response to inform the user that their connection to meetup was unsuccessful
            }
        });
    }
}
//  END: FOR DISPLAYING ALL THE EVENTS IN VIEW ALL
/**
 * @param location
 * @returns {{type, payload: *}}
 */
export function storeUserLocation(location){
        return {
            type: SAVE_LOCATION,
            payload: location
        };
}
/**
 * @param idArray
 * @returns {Function}
 */
export function submit_interests(idArray) {
    return function () {
        if(idArray.length >= 3) {
            instance.post(`${base_url}/insert_interests.php`, {idArray, userId}).then(resp => {
                //Create a client-side response to inform the user that their interests were added successfully
                console.log(resp.data);
            }).catch(err => {
                //Create a client-side response to inform the user that their interests were not added successfully
            });
        }
    }
}
/**
 * @param coords
 * @returns {Function}
 */
export function fetchWeather(coords){
    const WEATHER_KEY = 'cd2cd88ff4314ac744adc903f6f5a68d';
    const lat = coords.latitude;
    const long = coords.longitude;
    const WEATHER_URL = `https://api.darksky.net/forecast/${WEATHER_KEY}/${lat},${long}`;
    return function(dispatch){
        $.ajax({
            dataType: 'jsonp',
            crossDomain: true,
            method: 'GET',
            url: WEATHER_URL,
            success: function(response){
                dispatch({
                    type: FETCH_WEATHER,
                    payload: response
                });
            },
            error: function(response){
                console.error("Weather service not responding: ",response)
            }
        });
    }
}

/**
 * @param value
 * @returns {{type, payload: *}}
 */
export function loadSpinner(value){
    return {
        type: LOAD_SPINNER,
        payload: value
    }
}
