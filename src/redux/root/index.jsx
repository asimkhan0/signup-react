import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import SignUpReducer from '../signUp/signUp.reducer';
export default history => combineReducers({
    router: connectRouter(history),
    SignUp: SignUpReducer
});