export function userReducer(state=null,action) {
    switch(action.type){
        case "LOGIN":
            return action.payload;
        case "LOGOUT":
            return "Logout6666";
        default :
            return state;    
    }
}