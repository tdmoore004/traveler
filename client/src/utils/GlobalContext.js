import { createContext, useContext } from 'react';
import usePersistedState from "use-persisted-state-hook";

// set up our global context
export const GlobalContext = createContext();

const GlobalProvider = (props) => {
  const [userContext, setUserContext] = usePersistedState("userContext", { 
    user: "", isAuth: false 
  });

  return (
    <GlobalContext.Provider value={[userContext, setUserContext]} {...props} />
  );
};

export const GlobalConsumer = GlobalContext.Consumer;

export default GlobalProvider;

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};