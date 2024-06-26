import {createContext, useContext, useState} from "react";

const StateContext = createContext({
    currentUser: null,
    token: null,
    notification :null,
    setUser: () => {},
    setToken: () => {},
    setNotification :() =>{}
   
  })


  export const ContextProvider = ({children}) => {

    let storage = localStorage.getItem('ACCESS_TOKEN')

    const [user, setUser] = useState({});
    const [token, _setToken] = useState(storage);
    const [notification, _setNotification] = useState('')

    const setNotification = (message) => {

      _setNotification(message);
      setTimeout(() => {
        _setNotification('')
      },5000)
    }

  
    const setToken = (token) => {
      
      _setToken(token)
      if (token) {
        localStorage.setItem('ACCESS_TOKEN', token);
      } else {
        localStorage.removeItem('ACCESS_TOKEN');
      }
    }
  
  
  
    return (
      <StateContext.Provider value={{
        user,
        setUser,
        token,
        setToken,
        notification,
        setNotification
    
   
      }}>
        {children}
      </StateContext.Provider>
    );
  }
  
  export const useStateContext = () => useContext(StateContext);