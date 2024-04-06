import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { useContext } from "react";
import { UserContext } from "../App";
import { removeFromSession } from "../common/session";

const UserNavigationPanel = () => {
  const {
    userAuth: { username }, setUserAuth
  } = useContext(UserContext);

  const signOutUser = () => {
    removeFromSession("user");
    setUserAuth({ access_token: null })

  };

  return (
    <AnimationWrapper
      transition={{ duration: 0.2 }}
      className="absolute right-0 z-50"
    >
      <div className="bg-white absolute right-0 border border-grey w-60 duration-200 rounded-md">
        <Link to="/editor" className="flex items-center justify-between link md:hidden pl-8 py-4"> 
          <p>Write</p>
          <i className="fi fi-rr-file-edit text-xl"></i>
        </Link>
        <Link to={`/user/${username}`} className="flex items-center justify-between link md:hidden pl-8 py-4">
          Profile
          <i className="fi fi-rr-user-pen text-xl"></i>
        </Link>

        <Link to="/dashboard/blogs" className="flex items-center justify-between link md:hidden pl-8 py-4">
          Dashboard
          <i className="fi fi-rr-browsers text-xl"></i>
        </Link>

        <Link to="/settings/edit-profile" className="flex items-center justify-between link md:hidden pl-8 py-4">
          Settings
          <i className="fi fi-rr-settings text-xl"></i>
        </Link>

        <span className="absolute border-t border-grey ml-6 w-[100%]"></span>

        <button
          className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
          onClick={signOutUser}
        >
          <h1 className="font-bold text-xl mg-1">Sign Out</h1>
          <p className="text-dark-grey">@{username}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};
export default UserNavigationPanel;
