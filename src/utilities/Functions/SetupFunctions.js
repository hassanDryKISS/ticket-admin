import { clean, save, load } from '../../redux/localStorage'
import { setParam } from '../../redux/actions';
import * as Param from '../../redux/Param'
import store from "../../redux/store";
import history from '../../redux/history'
import notif from './Notification'

export function logout(type, title, message) {
    clean('user')
    clean('token')
    notif(type, title, message)
    store.dispatch(setParam(Param.TOKEN, null))
    store.dispatch(setParam(Param.USER_INFO, null))
    // window.location.replace('/')
    history.push('/')
}



export function checkUserAuthorized(isRequested = false) {
    load('token', (token) => {
        if (token !== null) {
            load('user_information', (user_information) => {
                if (user_information !== null) {
                    saveToken(token, () => {
                        saveUserInformation(user_information, () => {
                            if(isRequested){
                                history.push('/dashboard')
                            }
                        })
                    })
                }
                else {
                    if (!isRequested) {
                        logout('error', 'Error', 'You need to login again,  user information is not valid')
                    }
                }
            })
        }
        else {
            if (!isRequested) {
                logout('error', 'Error', 'You need to login again,  token is not valid')
            }
        }
    })
}


export function signIn(token, user_information) {
    saveToken(token, () => {
        saveUserInformation(user_information, () => {
            notif('success'
                , 'Success',
                'You have Successfully loged in to Ticket Dashboard')
            window.location.replace('/dashboard')
        })
    })
}




export function saveUserInformation(data, callback) {
    save('user_information', data, () => {
        store.dispatch(setParam(Param.USER_INFO, data))
        callback()
    })
}


export function saveToken(data, callback) {
    save('token', data, () => {
        store.dispatch(setParam(Param.TOKEN, data))
        callback()
    })
}