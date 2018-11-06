const INITIAL_STATE = {
    user: null //Should be username/picture? 
}

const LOGIN_USER = "LOGIN_USER"; 

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN_USER: 
            return Object.assign({}, state, {user: action.payload}); 
        default: 
            return state; 
    }
}

export function loginUser(user) {
    console.log('login user called from reducer', user)
    return {
        type: LOGIN_USER, 
        payload: user //This will be user object or username + photo URL
    }
}
