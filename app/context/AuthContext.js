import React,{createContext, useState} from "react";

const AuthContext=createContext();

const AuthProvider=()=>{
    // const [user, setUser] = useState("");
    const [loading,setLoading] = useState(true);

    const login=()=>{
      
    }
    return (
        <AuthContext.Provider value={{loading}}>
          {loading ? null : children}
        </AuthContext.Provider>
      );
}

export {AuthContext,AuthProvider}

