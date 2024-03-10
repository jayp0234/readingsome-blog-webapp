import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";

const App = () => {
  return (

    <Routes>
      <Route path="/" element={<Navbar/>}>
      <Route path="signup" element={<UserAuthForm type="sign-up"/>}/>
      <Route path="login" element={<UserAuthForm type="log-in"/>}/>
      </Route> 
    </Routes>
  );
};

export default App;
