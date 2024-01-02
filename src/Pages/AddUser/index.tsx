import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import AddUserApi from "../../apis/addUser";
import { Link } from "react-router-dom";
export default function index() {
  const userFormik = useFormik({
    initialValues: {
      fullName: "",
      userName: "",
      phone: "",
    },
    onSubmit: (value) => {
      AddUserApi(value)
        .then((res) => {
          console.log(res);

          userFormik.setValues({
            fullName: "",
            phone: "",
            userName: "",
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });

  return (
    <div className="max-w-4xl lg:px-0 px-4 py-4 text-center mx-auto">
      <h1 className="text-2xl">وارد کردن کاربر</h1>
      <form
        onSubmit={userFormik.handleSubmit}
        className="mt-4 flex flex-col gap-4"
      >
        <TextField
          value={userFormik.values.fullName}
          onChange={userFormik.handleChange}
          name="fullName"
          className="text-xl"
          id="outlined-basic"
          label="نام و نام خانوادگی"
          variant="outlined"
        />
        <TextField
          value={userFormik.values.userName}
          onChange={userFormik.handleChange}
          name="userName"
          id="outlined-basic"
          label="نام کاربری"
          variant="outlined"
        />
        <TextField
          value={userFormik.values.phone}
          onChange={userFormik.handleChange}
          name="phone"
          id="outlined-basic"
          label="شماره تلفن"
          variant="outlined"
        />
        <Button
          type="submit"
          className="w-full text-xl font-bold"
          variant="contained"
        >
          ثبت
        </Button>
        <Link to={"/users"}>
          <Button
            type="button"
            className="w-full text-xl font-bold"
            variant="contained"
          >
            لیست کاربران
          </Button>
        </Link>
      </form>
    </div>
  );
}
