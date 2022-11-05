import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const UserForm = ({ handleSubmitData, selectedUser, btnText }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const { username, email } = user;

  useEffect(() => {
    setUser({
      username: selectedUser.username,
      email: selectedUser.email,
    });
  }, [selectedUser]);
  const handleChange = (e) => {
    const selectedField = e.target.name;
    const selectedValue = e.target.value;
    setUser((prevState) => {
      return {
        ...prevState,
        [selectedField]: selectedValue,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitData(user);
    setUser({
      username: "",
      email: "",
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-row space-x-2">
          <label
            className=" text-black uppercase text-xl font-semibold"
            htmlFor="username"
          >
            User Name
          </label>
          <input
            className=" border-2 border-gray-500 focus:outline-none"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>
        <div className=" flex flex-row space-x-14 my-2">
          <label
            className=" text-black uppercase text-xl font-semibold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className=" border-2 border-gray-500 focus:outline-none"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className=" bg-green-600 text-gray-100 font-bold text-xs py-1 px-4 rounded-full my-3 uppercase"
        >
          {btnText}
        </button>
      </form>
    </div>
  );
};

UserForm.defaultProps = {
  selectedUser: {
    username: "",
    email: "",
  },
};

export default UserForm;
