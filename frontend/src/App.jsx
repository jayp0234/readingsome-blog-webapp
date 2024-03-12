import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";

export const UserContext = createContext({});

const App = () => {
  const [userAuth, setUserAuth] = useState({access_token: null}); // Set initial state to avoid undefined

  useEffect(() => {
    let userInSession = lookInSession("user");
    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({access_token: null})
  }, [])

  return (
    <UserContext.Provider value={{userAuth, setUserAuth}}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="signup" element={<UserAuthForm type="sign-up" />} />
          <Route path="login" element={<UserAuthForm type="log-in" />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
