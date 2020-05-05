import { SET_LOGGEDIN, SET_LOADING } from './signUp.action';

const initState = { 
    signedIn: localStorage.getItem('isLoggedIn'),
    loading: false
};

const SignUpReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, waiting: action.payload };
        case SET_LOGGEDIN:
            return { ...state, signedIn: action.payload };
        default:
            return state;
    }
}

export default SignUpReducer;