import React from "react";
import { useForm } from "react-hook-form";
import { userRegister } from "../service/news-http.service";
import { useNavigate } from "react-router-dom";

function UserRegistration() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);

        userRegister(data)
            .then((response) => {
                console.log(response);
                window.alert("Registration Successful");
                navigate("/login", { replace: true });
            })
            .catch((error) => console.error("error creating users:", error));
    };

    return (
        <center>
            <div>
                <p className="title">Registration Form</p>
            </div>

            <form className="App" onSubmit={handleSubmit(onSubmit)}>
                <lable>Name:</lable>
                <input type="text" {...register("name")} /><br></br>

                <lable>Email:</lable>
                <input type="email" {...register("email", { required: true })} /><br></br>

                {errors.email && (
                    <span style={{ color: "red" }}>*Email* is mandatory </span>
                )}

                <lable>Password:</lable>
                <input type="password" {...register("password")} /><br></br>

                <input type={"submit"} style={{ backgroundColor: "#a1eafb" }} />
            </form>
        </center>
    );
}

export default UserRegistration;
