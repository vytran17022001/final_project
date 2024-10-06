import React from "react";
import getData from "./getData";
import bcrypt from "bcryptjs";
import postData from "./postData";

export const register = async (email, password) => {
  const res = {
    success: false,
    message: "",
    data: {},
  };

  if (!email || !password) {
    res.message = "Vui long nhap email va mat khau";
    return res;
  }

  const users = await getData("user");
  const user = users.find((user) => user.user_email === email);

  if (user) {
    res.message = "Email is existed";
    return res;
  }

  const hashPassword = bcrypt.hashSync(password, process.env.REACT_APP_SALT);

  const data = {
    user_email: email,
    user_password: hashPassword,
  };

  await postData("user", data);

  res.data = user;
  res.success = true;
  res.message = "Dang ki thanh cong";
  return res;
};

export const login = async (email, password) => {
  const res = {
    success: false,
    message: "",
    data: {},
  };

  if (!email || !password) {
    res.message = "Vui long nhap email va mat khau";
    return res;
  }

  const users = await getData("user");
  const user = users.find((user) => user.user_email === email);
  if (!user) {
    res.message = "Email wrong";
    return res;
  }
  const match = bcrypt.compareSync(password, user.user_password);
  if (!match) {
    res.message = "Password wrong";
    return res;
  }
  const roleId = user.role_id;
  const roleList = await getData("role");
  const role = roleList.find((r) => r.id === roleId);
  const isAdmin = role && role.role_name ? role.role_name === "Admin" : false;

  res.data = user;
  res.isAdmin = isAdmin;
  res.success = true;
  res.message = "Dang nhap thanh cong";

  localStorage.setItem(
    "user",
    JSON.stringify({
      user_email: user.user_email,
      id: user.id,
      isAdmin,
    })
  );

  return res;
};
