import axios from '../../utils/axiosHandler';

export const SET_LOGGEDIN = 'SET_LOGGEDIN';
export const SET_LOADING = 'SET_LOADING';
//TODO: is it ok to create constants in actions or to create in separate constants file.

function setloggedIn(bool) {
    return {
        type: SET_LOGGEDIN,
        payload: bool
    }
}


function setLoading(bool) {
    return {
        type: SET_LOADING,
        payload: bool
    }
}

const getUUID = callback => {
    return dispatch => {
        dispatch(setLoading(true));
        //TODO: if created a constants file, put these URLs to there.
        return axios.get('https://httpbin.org/uuid')
            .then((response) => {
                callback({ flag: true, uuid: response.data.uuid });
                dispatch(setLoading(false));
            })
            .catch((err) => {
                callback({ flag: false, err: err });
                dispatch(setLoading(false));
            })
    }
}

const uploadProfilePicture = (data, callback) => {
    return dispatch => {
        dispatch(setLoading(true));
        return axios.post('https://httpbin.org/anything/pictures', data)
            .then((response) => {
                callback({ flag: true, response: response });
                dispatch(setLoading(false));
            })
            .catch((err) => {
                callback({ flag: false, err: err });
                dispatch(setLoading(false));
            })
    }
}

const signUpUser = (data, callback) => {
    return dispatch => {
        dispatch(setLoading(true));
        return axios.post('https://httpbin.org/anything/signup', data)
            .then((response) => {
                dispatch(setloggedIn(true))
                dispatch(setLoading(false));
                setTimeout(()=>callback({ flag: true, response: response }));
            })
            .catch((err) => {
                callback({ flag: false, err: err });
                dispatch(setLoading(false));
            })
    }
}

const LoginUser = (bool) => {
    bool ? 
        localStorage.setItem('isLoggedIn', true) :
        localStorage.removeItem('isLoggedIn')

    return dispatch => {
        dispatch(setloggedIn(bool));
    }
}

export {
    setloggedIn,
    setLoading,
    getUUID,
    uploadProfilePicture,
    signUpUser,
    LoginUser
}