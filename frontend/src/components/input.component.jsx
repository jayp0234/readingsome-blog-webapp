import { useState } from "react";

const InputBox = ({ name, type, id, value, placeholder, icon, disable = false }) => {

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="relative w-[100%] mb-4">
      <input
        name={name}
        type={
          type == "password" ? (passwordVisible ? "text" : "password") : type
        }
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        disabled = {disable}
        className="input-box"
      />
      <i className={"fi " + icon + " input-icon"}></i>

      {type == "password" ? (
        <i
          className={"fi " + (!passwordVisible ? "fi-sr-eye-crossed" : "fi-ss-eye" ) +  " input-icon left-auto right-5 cursor-pointer"}
          onClick={() => setPasswordVisible((currentVal) => !currentVal)}
        ></i>
      ) : (
        ""
      )}
    </div>
  );
};

export default InputBox;
