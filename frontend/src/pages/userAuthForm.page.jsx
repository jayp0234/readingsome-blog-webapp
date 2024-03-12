import { Link, Navigate } from "react-router-dom";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import AnimationWrapper from "../common/page-animation";
import { useContext, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../common/session";
import { UserContext } from "../App";
import { authWithGoogle } from "../common/firebase";

const UserAuthForm = ({ type }) => {
  
  const authForm = useRef();

  let { userAuth : { access_token }, setUserAuth } = useContext(UserContext)
  console.log(access_token)

  const userAuthThroughServer = (serverRoute, formData) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
      .then(({ data }) => {
        storeInSession("user", JSON.stringify(data));
        setUserAuth(data)
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = type == "log-in" ? "/login" : "/signup";

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

    //formData
    let form = new FormData(authForm.current);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { fullname, email, password } = formData;

    //formValidation
    if (fullname) {
      if (fullname.length < 3) {
        return toast.error("Full Name must be atleast 3 letters long");
      }
    }

    if (!email.length) {
      return toast.error("Enter Email Address");
    }
    if (!emailRegex.test(email)) {
      return toast.error("Email is Invalid");
    }
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password should be 6 to 20 characters long with a numeric, one lowercase and one upper case letter"
      );
    }

    userAuthThroughServer(serverRoute, formData);
  };

  const handleGoogleAuth = (e) => {

    e.preventDefault();

    authWithGoogle().then(user => {
      
      let serverRoute ="/google-auth";

      let formData = {
        access_token: user.accessToken
      }

      userAuthThroughServer(serverRoute, formData)

    })
    .catch(err => {
      toast.error("Trouble login through Google")
      return console.log(err)
    })
  }

  return (
    access_token ? 
    <Navigate to="/"/>
    :
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form ref={authForm} className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type == "sign-up" ? "Join us Today" : "Welcome Back"}
          </h1>

          {type == "log-in" ? (
            ""
          ) : (
            <InputBox
              name="fullname"
              type="text"
              placeholder="Full Name"
              icon="fi-ss-user"
            />
          )}

          <InputBox
            name="email"
            type="email"
            placeholder="Email"
            icon="fi-sr-envelope"
          />

          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-ss-key"
          />

          <button
            className="btn-dark center mt-14 "
            type="submit"
            onClick={handleSubmit}
          >
            {type.replace("-", " ")}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black"></hr>
            <p>or</p>
            <hr className="w-1/2 border-black"></hr>
          </div>

          <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center" 
          onClick={handleGoogleAuth}
          >
            <img src={googleIcon} alt="googleicon" className="w-7" />
            continue with google
          </button>

          {type == "log-in" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don't have an account?
              <Link
                to="/signup"
                className="underline text-black text-xl ml-1 font-semibold"
              >
                Join us Today
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Already a member?
              <Link
                to="/login"
                className="underline text-black text-xl font-semibold ml-1"
              >
                Log in Here
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
