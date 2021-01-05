import { createContext, useContext, useReducer } from 'react';

// set up our global context
export const GlobalContext = createContext();

// set up Global Provider & reducer
const initialState = {
  isAuth: localStorage.getItem("isAuth"),
  user: localStorage.getItem("user")
};

const reducer = (state, action) => {
  console.log({action});
  switch(action.type) {
    case "login":
      localStorage.setItem("isAuth", true);
      localStorage.setItem("user", action.payload);
      return {
        isAuth: true,
        user: action.payload
      };
    case "logout":
      localStorage.setItem("isAuth", "");
      localStorage.setItem("user", "");
      return {
        isAuth: false,
      };
    default:
      return state;
  }
};

const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={[state, dispatch]} {...props} />
  );
};

export const GlobalConsumer = GlobalContext.Consumer;

export default GlobalProvider;

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
