import { SET_LOGGEDIN, SET_LOADING } from './signUp.action';

const initState = { signedIn: false, loading: false };

const SignUpReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, waiting: action.payload };
        case SET_LOGGEDIN:
            debugger
            return { ...state, signedIn: action.payload };
        default:
            return state;
    }
}

export default SignUpReducer;