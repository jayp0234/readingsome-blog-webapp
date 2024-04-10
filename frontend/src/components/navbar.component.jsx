import { Link, Outlet, useNavigate } from "react-router-dom";
import darkLogo from "../imgs/logo-light.png";
import lightLogo from "../imgs/logo-dark.png";
import { useContext, useEffect, useState } from "react";
import { ThemeContext, UserContext } from "../App";
import UserNavigationPanel from "./user-navigation.component";
import axios from "axios";
import { storeInSession } from "../common/session";

const Navbar = () => {

  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const [userNavPanel, setUserNavPanel] = useState(false);

  let { theme, setTheme } = useContext(ThemeContext);

let navigate = useNavigate();

  const {
    userAuth,
    userAuth: { access_token, profile_img, new_notification_available },
    setUserAuth, 
  
  } = useContext(UserContext);

  useEffect(() => {

    if(access_token){
      axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/new-notification", {
        headers: {
          'Authorization' : `Bearer ${access_token}`
        }
      })
      .then(({data}) => {
        setUserAuth({ ...userAuth, ...data })
      })
      .catch(err => {
        console.log(err)
      })
    }

  }, [access_token])

  const handleSearch = (e) => {
    let query = e.target.value;

    if(e.keyCode == 13 && query.length){
      navigate(`/search/${query}`);
    }
  }

  const handleUserNavPanel = () => {
    setUserNavPanel(currentVal => !currentVal)
  }
  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false)
    }, 200)

  }

  const changeTheme = () => {
    let newTheme = theme == "light" ? "dark" : "light";

    setTheme(newTheme);

    document.body.setAttribute("data-theme", newTheme)

    storeInSession("theme", newTheme);
  }

  return (
    <>
      <nav className="bg-white navbar z-50">
        <Link to="/" className="flex-none w-14">
          <img src={ theme == "light" ? darkLogo : lightLogo} alt="logo" className="w-full drop-shadow-xl" />
          <button className="ml-[30%] text-2xl font-bold drop-shadow-xl sm:hidden">ReadingSome</button>
        </Link>
        


        <div
          className={
            "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] xl:ml-[10%] lg:ml-[12%] md:ml-[17%]  md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " +
            (searchBoxVisibility ? "show" : "hide")
          }
        >
          <input
            type="text"
            placeholder="Search"
            className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
            onKeyDown={handleSearch}
          />

          <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-black"></i>
        </div>


        <div className="flex items-center gap-3 md:gap-6 ml-auto ">
        
          {
             theme == "light" ? <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10" onClick={changeTheme}><i className="fi fi-ss-moon-stars text-2xl block mt-2"></i>  </button> : <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10" onClick={changeTheme}><i className="fi fi-ss-sun text-2xl block mt-2"></i>  </button>
          }
        

          <button
            className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
            onClick={() => setSearchBoxVisibility((currentVal) => !currentVal)}
          >
            <i className="fi fi-sr-search text-2xl mt-2"></i>
          </button>

          {/* self */}
          <Link
            to="/editor"
            className="hidden md:flex gap-2 bg-grey p-2 pt-3 rounded-md hover:bg-white mr-2"
          >
            <i className="fi fi-sr-file-edit"></i>
            <p>Write</p>
          </Link>

        

          {access_token ? (
            <>
              <Link to="/dashboard/notifications">
                <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10 ">
                  <i className="fi fi-ss-bell text-2xl block mt-2"></i>
                  
                  { 
                    new_notification_available ?
                    <span className="bg-red w-3 h-3 rounded-full absolute z-10 top-1 right-1"></span>
                    : ""
                  }
                 
                </button>
              </Link>

              <div className="relative" onClick={handleUserNavPanel} onBlur={handleBlur}>
                <button className="w-12 h-12 mt-2" >
                  <img src={profile_img} className="w-full h-full object-cover rounded-full" />
                </button>

                {
                  userNavPanel ? <UserNavigationPanel /> :
                    ""
                }

              </div>
            </>
          ) : (
            <>
              <Link className="btn-dark py-2 " to="/login">
                Log in
              </Link>
              <Link className="btn-light py-2 hidden md:block" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
