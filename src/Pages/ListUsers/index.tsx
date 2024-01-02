import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { UserType } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import getAllUsers from "../../apis/getUsers";
import { useFormik } from "formik";
import EditUserApi from "../../apis/patchUser";
import DeleteUserApi from "../../apis/deleteUser";

export default function index() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isModalOpenAddConfig, setModalOpenAddConfig] = useState(false);

  const editUserFormik = useFormik({
    initialValues: {
      fullName: "",
      userName: "",
      phone: "",
      id: 0,
    },
    onSubmit: (value) => {
      EditUserApi(value)
        .then((res) => {
          console.log(res);
          setModalOpenAddConfig(false);
          editUserFormik.setValues({
            fullName: "",
            phone: "",
            userName: "",
            id: 0,
          });

          setUsers((users) => {
            const newUsers = [...users];

            const targetIndex = newUsers.findIndex(
              (user) => user.id === res.id
            );

            newUsers[targetIndex] = res;

            return newUsers;
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        console.log(res);
        setUsers(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleEditUser = (id: number) => {
    const user = users.filter((user) => user.id === id)[0];
    editUserFormik.setValues(user);
  };

  const handleSubmitUser = () => {
    editUserFormik.handleSubmit();
  };

  const handleRemoveUser = (userId: number) => {
    DeleteUserApi(userId)
      .then((res) => {
        console.log(res);

        setUsers((users) => {
          const newUsers = users.filter((user) => user.id !== userId);

          return newUsers;
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns: ColumnsType<UserType> = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "نام و نام‌خانوادگی",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "نام کاربری",
      dataIndex: "userName",
      key: "userName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "شماره تلفن",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "ویرایش",
      dataIndex: "id",
      key: "id",
      render: (userId: number) => (
        <Button
          onClick={() => {
            setModalOpenAddConfig(true);
            handleEditUser(userId);
          }}
        >
          ویرایش
        </Button>
      ),
    },
    {
      title: "حذف",
      dataIndex: "id",
      key: "id",
      render: (userId: number) => (
        <Button danger onClick={() => handleRemoveUser(userId)} type="primary">
          حذف
        </Button>
      ),
    },
  ];

  return (
    <div className="max-w-7xl py-4 px-4 text-center mx-auto">
      <div className="flex justify-between">
        <h1 className="text-2xl">لیست کاربران</h1>
        <Link to={"/"}>
          <Button
            style={{
              backgroundColor: "main",
            }}
          >
            بازگشت
          </Button>
        </Link>
      </div>

      <Modal
        style={{
          fontFamily: "Shabnam",
        }}
        onCancel={() => setModalOpenAddConfig(false)}
        title="ویرایش کاربر"
        open={isModalOpenAddConfig}
        onOk={handleSubmitUser}
        // onCancel={handleCancel}
        okButtonProps={{
          style: {
            fontFamily: "Shabnam",
            backgroundColor: "green",
            color: "white",
          },
        }}
        cancelButtonProps={{
          style: {
            fontFamily: "Shabnam",
            backgroundColor: "#FF4D4F",
            color: "white",
          },
        }}
        cancelText={"لغو"}
        okText={"ثبت"}
      >
        <form className="flex flex-col gap-2" action="">
          <div>
            <label htmlFor="">نام و نام خانوادگی</label>
            <Input
              type="text"
              name="fullName"
              value={editUserFormik.values.fullName}
              onChange={editUserFormik.handleChange}
            />
          </div>
          <div>
            <label htmlFor="">نام کاربری</label>
            <Input
              type="text"
              name="userName"
              value={editUserFormik.values.userName}
              onChange={editUserFormik.handleChange}
            />
          </div>
          <div>
            <label htmlFor="">شماره تلفن</label>
            <Input
              type="text"
              name="phone"
              value={editUserFormik.values.phone}
              onChange={editUserFormik.handleChange}
            />
          </div>
        </form>
      </Modal>
      <div className="mt-8 w-full min-w-6xl overflow-x-scroll">
        <Table
          style={{
            fontFamily: "Shabnam",
          }}
          pagination={{ style: { direction: "ltr" } }}
          columns={columns}
          dataSource={users}
        />
      </div>
    </div>
  );
}
