import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";

import { setLoggedUser, userLogin } from "../service/news-http.service";

function UserLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setIsLoading(true);

    userLogin(data)
      .then((response) => {
        console.log(response.data);

        setLoggedUser(response.data[0]).then((response) => {
          window.alert("Login successful!");

          navigate(-1, { replace: true });
        });
      })

      .catch((error) =>
        console.log(
          "Email or Password is not matching with our record: " + error
        )
      )

      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <center>
        <p className="title">Login Form</p>
      </center>

      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register("email", { required: true })} />

        {errors.email && (
          <span style={{ color: "red" }}>Email is mandatory</span>
        )}

        <input type="password" {...register("password")} />

        <input type="submit" style={{ backgroundColor: "#a1eafb" }} />
      </form>
    </>
  );
}

export default UserLogin;
