const PARAM = 'PARAM_'
const PAGE = 'PAGE_'
const SERVER = ''

module.exports = {
    PARAM: PARAM,
    PAGE: PAGE,
    SERVER: SERVER,

    //DYNAMIC VARIEABLES
    ///////////////////////////////////////////////////////////PAGES 
    PAGE_ONE: PAGE + 'PAGE_ONE',

 


    ///////////////////////////////////////////////////////////PARAMETRS
    TOKEN: PARAM + 'TOKEN',
    USER_INFO: PARAM + 'USER_INFO',
    LOADING_PAGE: PARAM + 'LOADING_PAGE',
    LOADING_API: PARAM + 'LOADING_API',


    SERVER_URL: {
        AUTH:{
            LOGIN : 'admin/login',
        },
        TB_WEBSITE:{
            CONTACT : 'contact-us',
        },
        TB_RELOCATION_APP:{
            USER :{
                BASE : 'users',
            },
            INTERVIEW :{
                BASE : 'interview',
            },
            SKILL :{
                BASE : 'skill',
            },
            EXPERTISE :{
                ALL : 'expertise/all',
                BASE : 'expertise',
            },
            
        }
    }
}