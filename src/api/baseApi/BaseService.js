﻿import * as Param from '../../redux/Param'
import axios from 'axios'
import store from "../../redux/store";


export class API {

    POST(url, data) {
        return axios(`${process.env.REACT_APP_BACKEND_ADDR_APIS}/${url}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data)
        })
    }


    POST_AUTH(url, data) {
        return axios(`${process.env.REACT_APP_BACKEND_ADDR_APIS}/${url}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ` + store.getState().param[Param.TOKEN],
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data)
        })
    }


    // POST_FORMDATA_AUTH(url, data , percent) {
    //     return axios(`${process.env.REACT_APP_BACKEND_ADDR_APIS}/${url}`, {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': `Bearer ` + store.getState().param[Param.TOKEN],
    //             'Accept': 'application/json',
    //             'Content-Type': 'multipart/form-data',
    //         },
    //         data: data,
    //         onUploadProgress: function (progressEvent) {
    //             let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
    //         }
    //     })
    // }

    GET_PARAM_AUTH(url, params) {
        return axios(`${process.env.REACT_APP_BACKEND_ADDR_APIS}/${url}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ` + store.getState().param[Param.TOKEN],
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            params: {
                ...params
            }
        })
    }



    DELETE_AUTH(url) {
        return axios(`${process.env.REACT_APP_BACKEND_ADDR_APIS}/${url}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ` + store.getState().param[Param.TOKEN],
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    }



    GET_AUTH(url) {
        return axios(`${process.env.REACT_APP_BACKEND_ADDR_APIS}/${url}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ` + store.getState().param[Param.TOKEN],
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    }

    EDIT_AUTH(url ,data) {
        return axios(`${process.env.REACT_APP_BACKEND_ADDR_APIS}/${url}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ` + store.getState().param[Param.TOKEN],
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data)
        })
    }
}



