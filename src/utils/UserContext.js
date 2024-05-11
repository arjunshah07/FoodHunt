import { createContext } from "react";

const UserContext = createContext({

    user : {
        name : "Arjun" , 
     //   email : " arjunshah@gmail.com" ,
     //   isAuthenticated : false
    },
    loggedInUser : "Arjun Shah",
});

UserContext.displayName = "UserContext";

export default UserContext;