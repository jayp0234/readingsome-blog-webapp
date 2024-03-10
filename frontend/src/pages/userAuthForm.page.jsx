import { Link } from "react-router-dom";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import AnimationWrapper from "../common/page-animation";

const UserAuthForm = ({ type }) => {
  return (
    <AnimationWrapper keyValue={type}>
    <section className="h-cover flex items-center justify-center">
      <form className="w-[80%] max-w-[400px]">
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

        <button className="btn-dark center mt-14 " type="submit">
          {type.replace("-"," ")}
        </button>

        <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
          <hr className="w-1/2 border-black"></hr>
          <p>or</p>
          <hr className="w-1/2 border-black"></hr>
        </div>

        <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
          <img src={googleIcon} alt="googleicon" className="w-7" />
          continue with google
        </button>

            {
                type == "log-in" ?
                <p className="mt-6 text-dark-grey text-xl text-center">
                    Don't have an account?
                    <Link to="/signup" className="underline text-black text-xl ml-1 font-semibold">
                    Join us Today
                    </Link>
                </p> : 
                <p className="mt-6 text-dark-grey text-xl text-center">
                Already a member?
                <Link to="/login" className="underline text-black text-xl font-semibold ml-1">
                    Log in Here
                </Link>
            </p>
            }

      </form>
    </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
