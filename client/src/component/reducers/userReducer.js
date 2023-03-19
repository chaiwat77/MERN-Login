export function userReducer(state=null,action) {
    switch(action.type){
        case "LOGIN":
            return "Login";
        case "LOGOUT":
            return "Logout";
        default :
            return state;    
    }
}